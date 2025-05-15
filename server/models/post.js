const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    creatorId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    creatorName: {
      type: String,
      require: true,
    },
    creatorImage: {
      type: String,
      require: true,
    },
    creatorImageUrl: {
      type: String,
      require: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
      require: true,
    },
    comments: {
      type: [Schema.ObjectId],
      ref: "Comment",
    },
    images: {
      type: [String],
    },
    imagesUrl: {
      type: [String],
    },
    modifiers: {
      type: String,
      require: true,
    },
  },
  { collection: "posts", timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
