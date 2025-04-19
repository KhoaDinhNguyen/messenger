const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");

const {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  dropWaitingFriend,
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
  hello() {
    return "Hello world";
  },
};
