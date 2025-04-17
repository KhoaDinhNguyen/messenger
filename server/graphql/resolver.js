const userControllers = require("../controllers/userControllers");

module.exports = {
  createUser: userControllers.createUser,
  findUser: userControllers.findUser,
  hello() {
    return "Hello world";
  },
};
