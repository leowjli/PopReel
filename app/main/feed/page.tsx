"use client";

import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import VideoCard from "@/app/components/VideoCard";

async function getVideos(): Promise<Video[]> {
  const res = await fetch("/api/video", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error fetching videos:", res.statusText);
    return [];
  }

  return res.json();
}

export default function FeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getVideos();
      setVideos(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p className="text-gray-500 text-center">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500 text-center">No videos found. Upload one!</p>
      ) : (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
}
