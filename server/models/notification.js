const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    senderId: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },
    senderName: {
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
  },
  { collection: "notifications" }
);

module.exports = mongoose.model("Notification", notificationSchema);
