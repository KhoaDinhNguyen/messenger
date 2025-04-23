const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");
const messageControllers = require("../controllers/messageControllers");

const {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  acceptFriendRequest,
} = userControllers;

const {
  createNotification,
  getNotificationsById,
  dropNotificationBySenderAndReceiver,
} = notificationControllers;

const { createMessage, getMessage, getLatestMessages } = messageControllers;

module.exports = {
  createUser,
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
  hello() {
    return "Hello world";
  },
};
