const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emojiSchema = new Schema(
  {
    emojiCreatorId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    postId: {
      type: Schema.ObjectId,
      ref: "Post",
    },
    commentId: {
      type: Schema.ObjectId,
      ref: "Comment",
    },
    emoji: {
      type: String,
      require: true,
    },
  },
  {
    collection: "emojis",
  }
);

module.exports = mongoose.model("Emoji", emojiSchema);
