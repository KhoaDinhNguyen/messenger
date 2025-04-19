const Notification = require("../models/notification");
const User = require("../models/user");

const io = require("../socket");
const Sockets = require("../models/socket");

module.exports = {
  createNotification: async function ({ notificationInput }, req) {
    const { type, message, receiverId, senderId } = notificationInput;

    const newNotification = new Notification({
      type: type,
      message: message,
      receiverId: receiverId,
      senderId: senderId,
    });

    const foundSocket = Sockets.findSocketByUserId(receiverId.id);

    try {
      const [response, sender, receiver] = await Promise.all([
        newNotification.save(),
        User.findById(senderId.id),
        User.findById(receiverId.id),
      ]);
      newNotification._id = response._id;
      sender.waitingFriends.push({
        friendId: receiverId.id,
        friendName: receiver.name,
        type: "receiver",
      });
      receiver.waitingFriends.push({
        friendId: senderId.id,
        friendName: sender.name,
        type: "sender",
      });
      await Promise.all([
        newNotification.save(),
        sender.save(),
        receiver.save(),
      ]);
    } catch (err) {
      throw err;
    }

    if (foundSocket !== null) {
      console.log(foundSocket.socketId);
      try {
        io.getIO().to(foundSocket.socketId).emit("notification", {
          action: "friendRequest",
          notification: newNotification,
        });
        console.log(`emit to ${receiverId.id}`);
      } catch (err) {
        console.log(err);
      }
    }
    return newNotification;
  },
  getNotificationsById: async function ({ userInput }, req) {
    const { id } = userInput;

    try {
      const notifications = await Notification.find({ "receiverId.id": id });
      return notifications;
    } catch (err) {
      throw err;
    }
  },
};
