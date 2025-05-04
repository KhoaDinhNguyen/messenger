const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user");

const io = require("../socket");
const Sockets = require("../models/socket");
const { getImageFromS3 } = require("../s3");

const Notification = require("./notificationControllers");

require("dotenv").config();
sgMail.setApiKey("SG." + process.env.EMAIL_API_KEY);

const helperFunctions = {
  dropWaitingFriend: async function ({ userInput }) {
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
        Notification.dropNotificationBySenderAndReceiver({
          notificationInput: {
            senderId: id,
            receiverId: friendId,
            type: "friendRequest",
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
      throw err;
    }

    return true;
  },
};

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
      profileImageName: "",
      profileImageURL: "",
    });

    try {
      const response = await newUser.save();

      newUser.profileUrl = `${
        process.env.FRONTEND_API
      }/userpublic?userid=${response._id.toString()}`;
      newUser.friends.push({ friendId: response._id, friendName: name });

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
  updateUser: async function ({ userInput }, req) {
    const {
      id,
      username,
      password,
      name,
      gender,
      pronounce,
      dob,
      phone,
      email,
      profileUrl,
      profileImageName,
    } = userInput;

    const updateProfileParams = {};

    for (const key in userInput) {
      if (key === "id") {
        continue;
      } else if (key === "profileImageName") {
        //console.log("Have image name " + profileImageName);
        updateProfileParams.profileImageURL = await getImageFromS3({
          filename: userInput[key],
        });
      }
      updateProfileParams[key] = userInput[key];
    }

    if (Object.keys(updateProfileParams).length === 0) {
      return null;
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: updateProfileParams,
        },
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  },
  findUser: async function ({ userInput }, req) {
    const { username, password } = userInput;

    try {
      const foundUser = await User.findOne({ username: username });

      if (!foundUser) {
        const error = new Error("User does not exist");
        error.data = ["User does not exist"];
        error.status = 400;
        throw error;
      }

      const match = await bcrypt.compare(password, foundUser.password);

      if (!match) {
        const error = new Error("Password is incorrect");
        error.data = ["Password is incorrect"];
        error.status = 400;
        throw error;
      }

      return foundUser;
    } catch (err) {
      throw err;
    }
  },
  findUserById: async function ({ userInput }, req) {
    const { id } = userInput;

    const foundUser = await User.findById(id);

    if (foundUser === null) {
      const error = new Error("User does not exist");
      error.status = 400;
      throw error;
    }

    if (foundUser.profileImageName && foundUser.profileImageName !== "") {
      foundUser.profileImageURL = await getImageFromS3({
        filename: foundUser.profileImageName,
      });
    }

    return foundUser;
  },
  findUserByName: async function ({ userInput }, req) {
    const { name } = userInput;
    const foundUsers = await User.find({ $text: { $search: name } });

    //TODO: Fix promise all
    const foundUsersWithImages = foundUsers.map(async (user) => {
      if (user.profileImageName && user.profileImageName !== "") {
        user.profileImageURL = await getImageFromS3({
          filename: user.profileImageName,
        });
      }

      return user;
    });

    //await Promise.all(foundUsersWithImages);

    return foundUsersWithImages;
  },
  dropFriendRequest: async function ({ userInput, req }) {
    const { senderId, receiverId } = userInput;

    try {
      await helperFunctions.dropWaitingFriend({
        userInput: { id: senderId, friendId: receiverId },
      });
    } catch (err) {
      console.log(err);
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
        throw err;
      }
    }

    return true;
  },
  createFriendRequest: async function ({ userInput, req }) {
    const { senderId, receiverId, senderName, receiverName, message } =
      userInput;
    try {
      const [newNotification, ,] = await Promise.all([
        Notification.createNotification({
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
        Notification.dropNotificationBySenderAndReceiver({
          notificationInput: {
            senderId: senderId,
            receiverId: receiverId,
            type: "declineFriendRequest",
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
          //console.log(`emit to ${receiverId} -- id: foundSocket.socketId`);
        } catch (err) {
          console.log(err);
        }
      }
      return newNotification;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  declineFriendRequest: async function ({ userInput }, req) {
    const { senderId, receiverId, senderName, receiverName, message } =
      userInput;

    try {
      const [, newNotification] = await Promise.all([
        helperFunctions.dropWaitingFriend({
          userInput: {
            id: receiverId,
            friendId: senderId,
          },
        }),
        Notification.createNotification({
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

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO().to(foundSocket.socketId).emit("friendRequest", {
          action: "decline",
          notification: newNotification,
        });
        //console.log(`emit to ${receiverId} -- id: foundSocket.socketId`);
      }

      return newNotification;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  acceptFriendRequest: async function ({ userInput }, req) {
    const { senderId, receiverId, senderName, receiverName, message } =
      userInput;

    try {
      const [, newNotification] = await Promise.all([
        helperFunctions.dropWaitingFriend({
          userInput: {
            id: receiverId,
            friendId: senderId,
          },
        }),
        Notification.createNotification({
          notificationInput: {
            type: "acceptFriendRequest",
            message: message,
            senderId: senderId,
            receiverId: receiverId,
            senderName: senderName,
            receiverName: receiverName,
          },
        }),
        Notification.dropNotificationBySenderAndReceiver({
          notificationInput: {
            senderId: receiverId,
            receiverId: senderId,
            type: "declineFriendRequest",
          },
        }),
        Notification.dropNotificationBySenderAndReceiver({
          notificationInput: {
            senderId: senderId,
            receiverId: receiverId,
            type: "declineFriendRequest",
          },
        }),
        User.findByIdAndUpdate(senderId, {
          $push: {
            friends: {
              friendId: receiverId,
              friendName: receiverName,
            },
          },
        }),
        User.findByIdAndUpdate(receiverId, {
          $push: {
            friends: {
              friendId: senderId,
              friendName: senderName,
            },
          },
        }),
      ]);

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO().to(foundSocket.socketId).emit("friendRequest", {
          action: "accept",
          notification: newNotification,
        });
        c; //onsole.log(`emit to ${receiverId} -- id: foundSocket.socketId`);
      }
      return newNotification;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  generateImageURLWithUserId: async function ({ userInput }, req) {
    const { id } = userInput;

    try {
      const foundUser = await User.findById(id);

      if (foundUser.profileImageName && foundUser.profileImageName !== "") {
        const imageURL = await getImageFromS3({
          filename: foundUser.profileImageName,
        });
        foundUser.profileImageURL = imageURL;
      }

      return foundUser;
    } catch (err) {
      console.log(err);
    }
  },
};
