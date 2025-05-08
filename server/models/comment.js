const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    creatorId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    creatorName: {
      type: Schema.String,
      require: true,
    },
    comments: {
      type: [Schema.ObjectId],
      ref: "Comment",
    },
    text: {
      type: String,
      require: true,
    },
    images: {
      type: [String],
    },
    imagesUrl: {
      type: [String],
    },
  },
  { collection: "comments", timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
