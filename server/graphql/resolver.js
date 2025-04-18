const userControllers = require("../controllers/userControllers");

const { createUser, findUser, findUserById, findUserByName } = userControllers;

module.exports = {
  createUser,
  findUser,
  findUserById,
  findUserByName,
  hello() {
    return "Hello world";
  },
};
