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

    const foundSocket = Sockets.findSocketByUserId(receiverId.id);

    if (foundSocket !== null) {
      console.log(foundSocket.socketId);
      try {
        io.getIO().to(foundSocket.socketId).emit("friendRequest", {
          action: "create",
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
  dropNotificationBySenderAndReceiver: async function (
    { notificationInput },
    req
  ) {
    const { senderId, receiverId } = notificationInput;

    let removedNotification;

    try {
      removedNotification = await Notification.deleteOne({
        "senderId.id": senderId,
        "receiverId.id": receiverId,
      });
    } catch (err) {
      throw err;
    }

    const foundSocket = Sockets.findSocketByUserId(receiverId);

    if (foundSocket !== null) {
      console.log(foundSocket.socketId);
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
};
