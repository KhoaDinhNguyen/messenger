const { buildSchema } = require("graphql");
const userSchema = require("../schema/userSchema");
const notificationSchema = require("../schema/notificationSchema");
const messageSchema = require("../schema/messageSchema");
const commentSchema = require("../schema/commentSchema");
const postSchema = require("../schema/postSchema");
const contactSchema = require("../schema/contactSchema");
const emojiSchema = require("../schema/emojiSchema");

const {
  UserInputTypeSignUp,
  UserInputTypeLogin,
  UserInputTypeId,
  UserInputTypeName,
  UserInputTypeFriendRequest,
  UserInputTypeFriend,
  UserInputTypeUpdateProfile,
  UserType,
  UserWaitingFriendsType,
  UserFriendsType,
  createUser,
  updateUser,
  findUser,
  findUserById,
  findUserByName,
  dropWaitingFriend,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  acceptFriendRequest,
  generateImageURLWithUserId,
  ImageInputType,
  UserWithImageType,
} = userSchema;
//TODO: ImageInputType??

const {
  NotificationInputType,
  NotificationType,
  NotificationInputSenderAndReceiver,
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
} = notificationSchema;

const allTypes = [
  ...messageSchema.types,
  ...postSchema.types,
  ...commentSchema.types,
  ...contactSchema.types,
  ...emojiSchema.types,
];

const allInputTypes = [
  ...messageSchema.inputTypes,
  ...postSchema.inputTypes,
  ...commentSchema.inputTypes,
  ...contactSchema.inputTypes,
  ...emojiSchema.inputTypes,
];

const allMutations = [
  ...messageSchema.mutations,
  ...postSchema.mutations,
  ...commentSchema.mutations,
  ...contactSchema.mutations,
  ...emojiSchema.mutations,
];

const allQueries = [
  ...messageSchema.queries,
  ...postSchema.queries,
  ...commentSchema.queries,
  ...contactSchema.queries,
  ...emojiSchema.queries,
];

const schema = buildSchema(`
  ${UserType}
  ${UserWaitingFriendsType}
  ${UserFriendsType}
  ${UserWithImageType}
  ${NotificationType}
  
  ${ImageInputType}
  ${UserInputTypeSignUp}
  ${UserInputTypeLogin}
  ${UserInputTypeId}
  ${UserInputTypeName}
  ${UserInputTypeFriendRequest}
  ${UserInputTypeFriend}
  ${UserInputTypeUpdateProfile}

  ${NotificationInputType}
  ${NotificationInputSenderAndReceiver}

  ${allTypes.join("\n")}
  ${allInputTypes.join("\n")}

  type RootMutation {
    ${createUser}
    ${updateUser}
    ${declineFriendRequest}
    ${createFriendRequest}
    ${dropFriendRequest}
    ${acceptFriendRequest}
    ${dropWaitingFriend}

    ${createNotification}
    ${dropNotificationBySenderAndReceiver}

    ${allMutations.join("\n")}
  }

  type RootQuery {
    hello: String
    ${findUser}
    ${findUserById}
    ${findUserByName}
    ${getNotificationsById}

    ${generateImageURLWithUserId}
    
    ${allQueries.join("\n")}
    
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
