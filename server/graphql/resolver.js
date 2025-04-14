const userQueries = require("../queries/userQueries");

module.exports = {
  createUser: userQueries.createUser,
  hello() {
    return "Hello world";
  },
};
