const Notification = require("../models/notification");
const User = require("../models/user");

const io = require("../socket");
const Sockets = require("../models/socket");

module.exports = {
  createNotification: async function ({ notificationInput }, req) {
    const { type, message, receiverId, senderId, receiverName, senderName } =
      notificationInput;
    const newNotification = new Notification({
      type: type,
      message: message,
      receiverId: { id: receiverId, name: receiverName },
      senderId: { id: senderId, name: senderName },
    });

    try {
      await newNotification.save();
      newNotification._id = newNotification._id;
      await newNotification.save();
    } catch (err) {
      throw err;
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

    return true;
  },
};
