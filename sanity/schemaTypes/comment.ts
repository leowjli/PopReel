const comment = {
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
      {
        name: "postedBy",
        title: "Posted By",
        type: "reference",
        to: [{ type: "user" }]  
      },
      {
        name: "comment",
        title: "Comment",
        type: "string"
      }
    ]
  };
  
  export default comment;  