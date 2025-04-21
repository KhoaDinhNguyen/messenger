const NotificationInputSenderAndReceiver = `
  input NotificationInputSenderAndReceiver {
    senderId: String!
    receiverId: String!
    type: String!
  }
`;

const NotificationInputType = `
  input notificationInputType {
    type: String!
    message: String!
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const NotificationType = `
  type notificationType {
    _id: ID
    type: String
    message: String
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const createNotification = `
  createNotification(notificationInput: notificationInputType!) : notificationType
`;

const dropNotificationBySenderAndReceiver = `
  dropNotificationBySenderAndReceiver(notificationInput: NotificationInputSenderAndReceiver): Boolean
`;

const getNotificationsById = `
  getNotificationsById(userInput: UserInputTypeId!) : [notificationType]
`;

module.exports = {
  NotificationInputType,
  NotificationType,
  NotificationInputSenderAndReceiver,
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
};
