const video = {
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        hotspot: true,
      },
    },
    {
      name: "transcription",
      title: "Transcription",
      type: "text",
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "Posted By",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "comment" }],
        },
      ],
    },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
  ],
};

export default video;
