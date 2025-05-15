const { buildSchema } = require("graphql");
const userSchema = require("../schema/userSchema");
const notificationSchema = require("../schema/notificationSchema");
const MessageSchema = require("../schema/messageSchema");
const postSchema = require("../schema/postSchema");
const commentSchema = require("../schema/commentSchema");

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

const {
  CommentInputTypePost,
  CommentType,
  createCommentFromPost,
  CommentInputTypeId,
  getComments,
  CommentInputTypeComment,
  createCommentFromComment,
} = commentSchema;

const schema = buildSchema(`
  ${UserType}
  ${UserWaitingFriendsType}
  ${UserFriendsType}
  ${UserWithImageType}
  ${NotificationType}
  ${MessageType}
  ${PostType}
  ${CommentType}

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

  ${PostInputType}

  ${CommentInputTypePost}
  ${CommentInputTypeId}
  ${CommentInputTypeComment}

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

    ${createCommentFromPost}
    ${createCommentFromComment}
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
    ${getComments}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
