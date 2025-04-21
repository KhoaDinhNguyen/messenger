const NotificationInputSenderAndReceiver = `
  input NotificationInputSenderAndReceiver {
    senderId: String!
    receiverId: String!
    type: String!
  }
`;

const notificationInputType = `
  input notificationInputType {
    type: String!
    message: String!
    receiverId: UserInputTypeIdName!
    senderId: UserInputTypeIdName!
  }
`;

const notificationType = `
  type notificationType {
    _id: ID
    type: String
    message: String
    receiverId: UserIdNameType!
    senderId: UserIdNameType!
  }
`;

const createNotification = `
  createNotification(notificationInput: notificationInputType!) : notificationType
`;

const dropNotificationBySenderAndReceiver = `
  dropNotificationById(notificationInput: NotificationInputSenderAndReceiver): Boolean
`;

const getNotificationsById = `
  getNotificationsById(userInput: UserInputTypeId!) : [notificationType]
`;

module.exports = {
  notificationInputType,
  notificationType,
  NotificationInputSenderAndReceiver,
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
};
