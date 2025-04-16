const userQueries = require("../controllers/userControllers");

const UserInputTypeSignUp = `
  input UserInputTypeSignUp {
    username: String!
    password: String!
    name: String!
    gender: String!
    pronounce: String
    dob: String!
    phone: String
    email: String
  }
`;

const UserInputTypeLogin = `
  input UserInputTypeLogin {
    username: String!
    password: String!
  }
`;

const UserType = `
  type UserType {
    _id: ID
    username: String!
    password: String
    name: String
    gender: String
    pronounce: String
    dob: String
    phone: String
    email: String
    friends: [UserType]
  }
`;

const createUser = `
  createUser(userInput: UserInputTypeSignUp): UserType!
`;

const findUser = `
  findUser(userInput: UserInputTypeLogin): UserType!
`;

module.exports = {
  createUser,
  UserType,
  UserInputTypeSignUp,
  UserInputTypeLogin,
  findUser,
};
