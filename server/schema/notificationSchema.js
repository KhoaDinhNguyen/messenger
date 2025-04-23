const NotificationInputSenderAndReceiver = `
  input NotificationInputSenderAndReceiver {
    senderId: String!
    receiverId: String!
    type: String!
  }
`;

const NotificationInputType = `
  input NotificationInputType {
    type: String!
    message: String!
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const NotificationType = `
  type NotificationType {
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
  createNotification(notificationInput: NotificationInputType!) : NotificationType
`;

const dropNotificationBySenderAndReceiver = `
  dropNotificationBySenderAndReceiver(notificationInput: NotificationInputSenderAndReceiver): Boolean
`;

const getNotificationsById = `
  getNotificationsById(userInput: UserInputTypeId!) : [NotificationType]
`;

module.exports = {
  NotificationInputType,
  NotificationType,
  NotificationInputSenderAndReceiver,
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
};
