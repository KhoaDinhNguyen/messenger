const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: String,
    name: String,
    gender: String,
    pronounce: String,
    dob: String,
    email: String,
    phone: String,
    friends: [
      {
        friendId: { type: Schema.ObjectId, ref: "User" },
        friendName: { type: String, require: true },
      },
    ],
    waitingFriends: [
      {
        friendId: { type: Schema.ObjectId, ref: "User" },
        friendName: { type: String, require: true },
        type: { type: String, require: true },
      },
    ],
    profileUrl: {
      type: String,
      require: true,
    },
    profileImageName: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      require: true,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
