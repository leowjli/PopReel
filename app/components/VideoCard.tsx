import { Video } from "@/types/video";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="mb-4">
      <video controls className="w-full rounded-lg">
        <source src={video.video.asset.url} type="video/mp4" />
      </video>

      <p className="mt-2 text-center">{video.caption || "No caption available"}</p>
      <p className="mt-2 text-center">{video.video.asset.transcription || "No transcription available"}</p>
      <p className="mt-2 text-center">{video.video.asset.summary || "No summary available"}</p>

      <p className="mt-2 text-center">
        <strong>Tags:</strong>{" "}
        {Array.isArray(video.video.asset.tags) && video.video.asset.tags.length > 0
          ? video.video.asset.tags.join(", ")
          : "No tags available"}
      </p>

      <p className="mt-2 text-center"><strong>Topic:</strong> {video.topic || "No topic"}</p>
      <p className="mt-2 text-center"><strong>Likes:</strong> {video.likes?.length || 0}</p>
      <p className="mt-2 text-center"><strong>Comments:</strong> {video.comments?.length || 0}</p>
    </div>
  );
}