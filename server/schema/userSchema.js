const userQueries = require("../controllers/userControllers");

const UserInputTypeName = `
  input UserInputTypeName {
    name: String!
  }
`;

const UserInputTypeId = `
  input UserInputTypeId {
    id: String!
  }
`;

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
    username: String
    password: String
    name: String
    gender: String
    pronounce: String
    dob: String
    phone: String
    email: String
    friends: [UserType]
    profileUrl: String
  }
`;

const createUser = `
  createUser(userInput: UserInputTypeSignUp): UserType!
`;

const findUser = `
  findUser(userInput: UserInputTypeLogin): UserType!
`;

const findUserById = `
  findUserById(userInput: UserInputTypeId): UserType!
`;

const findUserByName = `
  findUserByName(userInput: UserInputTypeName): [UserType!]
`;

module.exports = {
  createUser,
  UserType,
  UserInputTypeId,
  UserInputTypeSignUp,
  UserInputTypeLogin,
  UserInputTypeName,
  findUser,
  findUserById,
  findUserByName,
};
