const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");

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
  hello() {
    return "Hello world";
  },
};
