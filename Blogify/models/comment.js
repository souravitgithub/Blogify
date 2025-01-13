const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
    },
  },
  { timestamps: true }
);

const Comments = model("comments", commentSchema);

module.exports = Comments;
