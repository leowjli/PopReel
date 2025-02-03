import { Video } from "@/types/video";

async function getVideoById(id: string): Promise<Video> {
  const res = await fetch(`/api/videos/${id}`);
  return res.json();
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id);

  return (
    <div>
      <video src={video.video.asset.url} controls />
      <h1>{video.caption}</h1>
      <p>{video.video.asset.summary}</p>
      <div>
        <h2>Comments</h2>
        {video.comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <p>By: {comment.postedBy._ref}</p>
          </div>
        ))}
      </div>
    </div>
  );
}