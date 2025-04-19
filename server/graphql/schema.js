const { buildSchema } = require("graphql");
const userRoutes = require("../schema/userSchema");
const notificationRouts = require("../schema/notificationSchema");

const { UserWaitingFriendsType, UserIdNameType, UserInputTypeIdName } =
  userRoutes;
const {
  notificationInputType,
  notificationType,
  createNotification,
  getNotificationsById,
} = notificationRouts;

const schema = buildSchema(`
  ${userRoutes.UserType}
  ${userRoutes.UserInputTypeSignUp}
  ${userRoutes.UserInputTypeLogin}
  ${userRoutes.UserInputTypeId}
  ${userRoutes.UserInputTypeName}

  ${UserInputTypeIdName}
  ${UserIdNameType}
  ${UserWaitingFriendsType}

  ${notificationInputType}
  ${notificationType}
  
  type RootMutation {
    ${userRoutes.createUser}
    ${createNotification}
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
