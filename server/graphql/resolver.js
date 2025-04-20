const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");

const {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  dropWaitingFriend,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
} = userControllers;
const { createNotification, getNotificationsById } = notificationControllers;

module.exports = {
  createUser,
  dropWaitingFriend,
  findUser,
  findUserById,
  findUserByName,
  createNotification,
  getNotificationsById,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  hello() {
    return "Hello world";
  },
};
