const { buildSchema } = require("graphql");
const userSchema = require("../schema/userSchema");
const notificationSchema = require("../schema/notificationSchema");
const MessageSchema = require("../schema/messageSchema");
const postSchema = require("../schema/postSchema");

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
} = MessageSchema;

const { PostType, PostInputType, createPost, getPost } = postSchema;

const schema = buildSchema(`
  ${UserType}
  ${UserWaitingFriendsType}
  ${UserFriendsType}
  ${UserWithImageType}
  ${PostType}
  ${ImageInputType}

  ${NotificationType}
  
  ${MessageType}

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

  ${PostInputType}

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

    ${createPost}
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
    ${getPost}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
