const userQueries = require("../queries/userQueries");

const UserInputType = `
  input UserInputType {
    username: String!
    password: String!
    firstName: String
    lastName: String
    gender: String
    dob: String
    phoneNumber: String
    email: String
  }
`;

const UserType = `
  type UserType {
    _id: ID!
    username: String!
    password: String
    firstName: String
    lastName: String
    gender: String
    dob: String
    phoneNumber: String
    email: String
  }
`;

const createUser = `
  createUser(userInput: UserInputType): UserType!
`;

const findUser = `
  findUser(userInput: UserInputType): UserType!
`;

module.exports = {
  createUser,
  UserType,
  UserInputType,
  findUser,
};
