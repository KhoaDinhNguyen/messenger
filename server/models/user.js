const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  friends: [{ type: Schema.ObjectId, ref: "User" }],
  profileUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
