export interface Video {
  _id: string;
  caption: string;
  video: {
    asset: {
      url: string;
      transcription: string;
      summary: string; // AI-generated summary of the video
      tags: string[];
    };
  };
  userId: string;
  postedBy: {
    _ref: string;
    _type: "reference";
  };
  likes: {
    _ref: string;
    _type: "reference";
  }[];
  comments: Comment[];
  topic: string;
}

export interface Comment {
  _id: string;
  text: string;
  postedBy: {
    _ref: string;
    _type: "reference";
  };
}