const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user");

const io = require("../socket");
const Sockets = require("../models/socket");

const {
  dropNotificationBySenderAndReceiver,
  createNotification,
} = require("./notificationControllers");
const {
  createFriendRequest,
  dropFriendRequest,
} = require("../schema/userSchema");
const notification = require("../models/notification");

const MongoClient = mongodb.MongoClient;

require("dotenv").config();
sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { username, password, name, gender, pronounce, dob, phone, email } =
      userInput;

    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      const error = new Error("Something wrong with server");
      error.status = 500;
      throw error;
    }

    const emailSave = !email ? "" : email;
    const phoneSave = !phone ? "" : phone;
    const pronounceSave = !pronounce ? "" : pronounce;
    const errors = [];

    const doc = await User.exists({ username: username });
    if (doc !== null) {
      errors.push("Username has existed");
    }

    if (emailSave !== "") {
      const doc = await User.exists({ email: emailSave });
      if (doc !== null) {
        errors.push("Email has been used");
      }
    }

    if (errors.length > 0) {
      const error = new Error("Invalid user's input");
      error.data = errors;
      error.code = 400;
      throw error;
    }

    const newUser = new User({
      username: username,
      password: hashedPassword,
      name: name,
      gender: gender,
      pronounce: pronounceSave,
      dob: dob,
      phone: phoneSave,
      email: emailSave,
      friends: [],
      waitingFriends: [],
      profileUrl: "",
    });

    try {
      const response = await newUser.save();

      newUser.profileUrl = `${
        process.env.FRONTEND_API
      }/userpublic?userid=${response._id.toString()}`;
      newUser.friends.push(response._id);

      await newUser.save();
    } catch (err) {
      throw err;
    }

    if (emailSave !== null) {
      const message = {
        to: emailSave,
        from: process.env.EMAIL_FROM,
        subject: "Sign up successfully",
        text: `Hello ${name}, you have signed up message`,
        html: `<h1>Hello ${name}, you have signed up message</h1>`,
      };

      sgMail
        .send(message)
        .then((response) => {
          console.log("Email has been send");
        })
        .catch(async (err) => {
          newUser.email = "";
          await newUser.save();
        });
    }

    return newUser;
  },

  findUser: async function ({ userInput }, req) {
    // TODO: Change mongoose
    const { username, password } = userInput;

    let client;
    try {
      client = await MongoClient.connect(process.env.DATABASE_CONNECTION);
    } catch (e) {
      const err = new Error("Something wrong with database");
      err.status = 500;
      throw err;
    }

    let foundUser;
    try {
      foundUser = await client
        .db()
        .collection("users")
        .findOne({ username: username });
    } catch (e) {
      const err = new Error("Something wrong with database");
      err.status = 500;
      throw err;
    }

    if (!foundUser) {
      const error = new Error("User does not exist");
      error.status = 400;
      throw error;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      const error = new Error("Password is incorrect");
      error.status = 400;
      throw error;
    }

    return foundUser;
  },
  findUserById: async function ({ userInput }, req) {
    const { id } = userInput;

    const foundUser = await User.findById(id);

    if (foundUser === null) {
      const error = new Error("User does not exist");
      error.status = 400;
      throw error;
    }

    return foundUser;
  },
  findUserByName: async function ({ userInput }, req) {
    const { name } = userInput;
    const foundUsers = await User.find({ $text: { $search: name } });

    return foundUsers;
  },
  dropWaitingFriend: async function ({ userInput }, req) {
    const { id, friendId } = userInput;

    try {
      await Promise.all([
        User.updateOne(
          { _id: id },
          { $pull: { waitingFriends: { friendId: friendId } } }
        ),
        User.updateOne(
          { _id: friendId },
          { $pull: { waitingFriends: { friendId: id } } }
        ),
        dropNotificationBySenderAndReceiver({
          notificationInput: {
            senderId: id,
            receiverId: friendId,
          },
        }),
      ]);
    } catch (err) {
      throw err;
    }

    return true;
  },
  dropFriendRequest: async function ({ userInput, req }) {
    const { senderId, receiverId } = userInput;

    try {
      await this.dropWaitingFriend({
        userInput: { id: senderId, friendId: receiverId },
      });
    } catch (err) {
      throw err;
    }

    const foundSocket = Sockets.findSocketByUserId(receiverId);

    if (foundSocket !== null) {
      try {
        io.getIO()
          .to(foundSocket.socketId)
          .emit("friendRequest", {
            action: "remove",
            notification: { senderId: senderId },
          });
      } catch (err) {
        console.log(err);
      }
    }

    return true;
  },
  createFriendRequest: async function ({ userInput, req }) {
    const { senderId, receiverId, senderName, receiverName, message } =
      userInput;

    try {
      const [newNotification, ,] = await Promise.all([
        createNotification({
          notificationInput: {
            type: "friendRequest",
            message: message,
            senderId: senderId,
            receiverId: receiverId,
            senderName: senderName,
            receiverName: receiverName,
          },
        }),
        User.findByIdAndUpdate(senderId, {
          $push: {
            waitingFriends: {
              friendId: receiverId,
              friendName: receiverName,
              type: "receiver",
            },
          },
        }),
        User.findByIdAndUpdate(receiverId, {
          $push: {
            waitingFriends: {
              friendId: senderId,
              friendName: senderName,
              type: "sender",
            },
          },
        }),
      ]);

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        try {
          io.getIO().to(foundSocket.socketId).emit("friendRequest", {
            action: "create",
            notification: newNotification,
          });
          console.log(`emit to ${receiverId}`);
        } catch (err) {
          console.log(err);
        }
      }
      return newNotification;
    } catch (err) {
      throw err;
    }
  },
  declineFriendRequest: async function ({ userInput }, req) {
    const { senderId, receiverId, senderName, receiverName, message } =
      userInput;

    try {
      const [, newNotification] = await Promise.all([
        this.dropWaitingFriend({
          userInput: {
            id: receiverId,
            friendId: senderId,
          },
        }),
        createNotification({
          notificationInput: {
            type: "declineFriendRequest",
            message: message,
            senderId: senderId,
            receiverId: receiverId,
            senderName: senderName,
            receiverName: receiverName,
          },
        }),
      ]);

      console.log(receiverId);
      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO().to(foundSocket.socketId).emit("friendRequest", {
          action: "decline",
          notification: newNotification,
        });
        console.log(`emit to ${receiverId}`);
      }
      return newNotification;
    } catch (err) {
      throw err;
    }
  },
};
