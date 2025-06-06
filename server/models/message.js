const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    senderName: {
      type: String,
      require: true,
    },
    senderEmoji: {
      type: String,
      require: true,
    },
    receiverEmoji: {
      type: String,
      require: true,
    },
    receiverId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    receiverName: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    haveSeen: {
      type: Boolean,
      require: true,
    },
    images: {
      type: [String],
      require: true,
    },
    imagesUrl: {
      type: [String],
      require: true,
    },
    replyOf: {
      type: Schema.ObjectId,
      ref: "Message",
    },
    receiverHidden: {
      type: Boolean,
    },
    senderHidden: {
      type: Boolean,
    },
  },
  { collection: "messages", timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
