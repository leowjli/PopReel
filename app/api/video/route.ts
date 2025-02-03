import { NextResponse } from "next/server";
import createClient from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

export async function GET() {
  try {
    const query = `*[_type == "video"]{
      _id,
      caption,
      video{ asset->{url} },
      transcription,
      summary,
      tags,
      userId,
      postedBy->{_ref},
      likes[]->{_id},
      comments[]->{_id},
      topic
    }`;
    
    const videos = await sanityClient.fetch(query);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}