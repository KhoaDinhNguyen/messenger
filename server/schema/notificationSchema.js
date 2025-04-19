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

const getNotificationsById = `
  getNotificationsById(userInput: UserInputTypeId!) : [notificationType]
`;

module.exports = {
  notificationInputType,
  notificationType,
  createNotification,
  getNotificationsById,
};
