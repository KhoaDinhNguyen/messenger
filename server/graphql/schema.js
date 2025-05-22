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

const {
  MessageInputType,
  MessageInputTypeEmoji,
  MessageType,
  MessageInputTypeSenderAndReceiver,
  createMessage,
  getMessage,
  getLatestMessages,
  updateHaveSeenMessages,
  updateMessageEmoji,
} = messageSchema;

const allTypes = [
  ...postSchema.types,
  ...commentSchema.types,
  ...contactSchema.types,
  ...emojiSchema.types,
];

const allInputTypes = [
  ...postSchema.inputTypes,
  ...commentSchema.inputTypes,
  ...contactSchema.inputTypes,
  ...emojiSchema.inputTypes,
];

const allMutations = [
  ...postSchema.mutations,
  ...commentSchema.mutations,
  ...contactSchema.mutations,
  ...emojiSchema.mutations,
];

const allQueries = [
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
  ${MessageType}

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

  ${MessageInputType}
  ${MessageInputTypeSenderAndReceiver}
  ${MessageInputTypeEmoji}

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

    ${createMessage}
    ${updateHaveSeenMessages}
    ${updateMessageEmoji}

    ${allMutations.join("\n")}
  }

  type RootQuery {
    hello: String
    ${findUser}
    ${findUserById}
    ${findUserByName}
    ${getNotificationsById}
    ${getMessage}
    ${getLatestMessages}
    ${generateImageURLWithUserId}
    
    ${allQueries.join("\n")}
    
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
