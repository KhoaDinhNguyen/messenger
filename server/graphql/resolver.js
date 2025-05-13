const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");
const messageControllers = require("../controllers/messageControllers");
const postController = require("../controllers/postControllers");
const commentControllers = require("../controllers/commentControllers");

const {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  acceptFriendRequest,
  updateUser,
  generateImageURLWithUserId,
} = userControllers;

const {
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
} = notificationControllers;

const {
  createMessage,
  getMessage,
  getLatestMessages,
  updateHaveSeenMessages,
  updateMessageEmoji,
} = messageControllers;

const { createPost, getPost } = postController;

const { createCommentFromPost, getComments, createCommentFromComment } =
  commentControllers;

module.exports = {
  createUser,
  updateUser,
  findUser,
  findUserById,
  findUserByName,
  createNotification,
  getNotificationsById,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  acceptFriendRequest,
  dropNotificationBySenderAndReceiver,
  createMessage,
  getMessage,
  getLatestMessages,
  updateHaveSeenMessages,
  generateImageURLWithUserId,
  updateMessageEmoji,
  createPost,
  getPost,
  createCommentFromPost,
  getComments,
  createCommentFromComment,
  hello() {
    return "Hello world";
  },
};
