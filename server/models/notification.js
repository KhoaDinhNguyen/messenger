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
      id: {
        type: Schema.ObjectId,
        ref: "User",
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },
    receiverId: {
      id: {
        type: Schema.ObjectId,
        ref: "User",
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },
  },
  { collection: "notifications" }
);

module.exports = mongoose.model("Notification", notificationSchema);
