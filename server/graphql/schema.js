const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");
const notificationRouts = require("../schema/notificationSchema");

const {
  UserWaitingFriendsType,
  UserIdNameType,
  UserInputTypeIdName,
  dropWaitingFriend,
  UserInputTypeFriend,
  UserInputTypeFriendRequest,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
} = userRoutes;

const {
  notificationInputType,
  notificationType,
  NotificationInputSenderAndReceiver,
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
} = notificationRouts;

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputTypeSignUp}
  ${userRoutes.UserInputTypeLogin}
  ${userRoutes.UserInputTypeId}
  ${userRoutes.UserInputTypeName}

  ${UserInputTypeFriend}
  ${UserInputTypeIdName}
  ${UserIdNameType}
  ${UserWaitingFriendsType}
  ${UserInputTypeFriendRequest}
  
  ${notificationInputType}
  ${notificationType}
  ${NotificationInputSenderAndReceiver}

  type RootMutation {
    ${userRoutes.createUser}
    ${createNotification}
    ${dropNotificationBySenderAndReceiver}
    ${dropWaitingFriend}
    ${declineFriendRequest}
    ${createFriendRequest}
    ${dropFriendRequest}
  }

  type RootQuery {
    hello: String
    ${userRoutes.findUser}
    ${userRoutes.findUserById}
    ${userRoutes.findUserByName}
    ${getNotificationsById}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
