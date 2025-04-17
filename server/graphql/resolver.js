const userControllers = require("../controllers/userControllers");

const { createUser, findUser, findUserById } = userControllers;

module.exports = {
  createUser,
  findUser,
  findUserById,
  hello() {
    return "Hello world";
  },
};
