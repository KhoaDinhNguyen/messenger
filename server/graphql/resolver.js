const userQueries = require("../queries/userQueries");

module.exports = {
  createUser: userQueries.createUser,
  findUser: userQueries.findUser,
  hello() {
    return "Hello world";
  },
};
