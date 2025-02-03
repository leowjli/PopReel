import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // Call your AI recommendation API
  const response = await fetch(`http://your-ai-api/recommend?userId=${userId}`);
  const data = await response.json();

  return NextResponse.json(data);
}