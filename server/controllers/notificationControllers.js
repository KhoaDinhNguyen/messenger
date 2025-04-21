const Notification = require("../models/notification");

module.exports = {
  createNotification: async function ({ notificationInput }, req) {
    const { type, message, receiverId, senderId, receiverName, senderName } =
      notificationInput;

    const newNotification = new Notification({
      type: type,
      message: message,
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      receiverName: receiverName,
    });

    try {
      await newNotification.save();
    } catch (err) {
      throw err;
    }

    return newNotification;
  },
  getNotificationsById: async function ({ userInput }, req) {
    const { id } = userInput;

    try {
      const notifications = await Notification.find({ receiverId: id });
      return notifications;
    } catch (err) {
      throw err;
    }
  },
  dropNotificationBySenderAndReceiver: async function (
    { notificationInput },
    req
  ) {
    const { senderId, receiverId, type } = notificationInput;

    // console.log(notificationInput);
    let removedNotification;

    try {
      removedNotification = await Notification.deleteMany({
        senderId: senderId,
        receiverId: receiverId,
        type: type,
      });
    } catch (err) {
      throw err;
    }

    return true;
  },
};
