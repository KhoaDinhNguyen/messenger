const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");

const { createUser, findUser, findUserById, findUserByName } = userControllers;
const { createNotification, getNotificationsById } = notificationControllers;

module.exports = {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  createNotification,
  getNotificationsById,
  hello() {
    return "Hello world";
  },
};
