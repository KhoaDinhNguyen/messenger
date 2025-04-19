const UserInputTypeFriend = `
  input UserInputTypeFriend {
    id: String!
    friendId: String!
  }
`;

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

const UserInputTypeIdName = `
  input UserInputTypeIdName {
    id: String!
    name: String!
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

const UserWaitingFriendsType = `
  type UserWaitingFriendsType {
    friendId: String
    friendName: String
    type: String
  }
`;

const UserIdNameType = `
  type UserIdNameType {
    id: String!
    name: String!
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
    waitingFriends: [UserWaitingFriendsType]
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

const dropWaitingFriend = `
  dropWaitingFriend(userInput: UserInputTypeFriend): Boolean
`;

module.exports = {
  createUser,
  UserType,
  UserInputTypeFriend,
  UserWaitingFriendsType,
  UserIdNameType,
  UserInputTypeId,
  UserInputTypeSignUp,
  UserInputTypeLogin,
  UserInputTypeName,
  UserInputTypeIdName,
  findUser,
  findUserById,
  findUserByName,
  dropWaitingFriend,
};
