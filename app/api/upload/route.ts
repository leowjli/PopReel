import { NextRequest, NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route"; // ✅ Ensure correct import path
import createClient from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ✅ Function to find or create a user in Sanity
async function getUserId(email: string, name?: string) {
  const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });

  if (existingUser) {
    return existingUser._id;
  }

  const newUserId = `user-${uuidv4()}`;
  await sanityClient.create({
    _id: newUserId,
    _type: "user",
    email,
    name: name ?? "Unknown User",
  });

  return newUserId;
}

export async function POST(req: NextRequest) {
  try {
    const session: Session | null = await getServerSession(handler);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized: No email found" }, { status: 401 });
    }

    const userName = session.user.name ?? "Unknown User"

    const userId = await getUserId(session.user.email, userName);

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const sanityResponse = await sanityClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    const videoUrl = sanityResponse.url;

    const fileForWhisper = new File([buffer], file.name, { type: file.type })

    const transcriptionResponse = await groq.audio.transcriptions.create({
      model: "whisper-large-v3",
      file: fileForWhisper,
      response_format: "text",
    });
    const transcription = transcriptionResponse?.text || "No transcription available.";

    const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    const aiResponse = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: `Summarize this video content: ${transcription}` }] }],
    });
    const summary = aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

    const tagsResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Generate relevant tags for this video summary: ${summary}` }],
      model: "llama-3.3-70b-versatile",
    });
    const tags = tagsResponse.choices?.[0]?.message?.content?.split(", ") || ["Uncategorized"];


    const doc = {
      _type: "video",
      caption: "Uploaded video",
      video: { asset: { _ref: sanityResponse._id } },
      transcription,
      summary,
      tags,
      postedBy: {
        _type: "reference",
        _ref: userId,
      },
    };

    await sanityClient.create(doc);

    return NextResponse.json({ message: "Upload successful", videoUrl, transcription, summary, tags });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ error: "Failed to process the upload" }, { status: 500 });
  }
}

