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

const UserInputTypeFriendRequest = `
  input UserInputTypeFriendRequest {
    senderId: String!
    receiverId: String!
    senderName: String
    receiverName: String
    message: String
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

const UserInputTypeFriend = `
  input UserInputTypeFriend {
    id: String!
    friendId: String!
  }
`;

const UserWaitingFriendsType = `
  type UserWaitingFriendsType {
    friendId: String
    friendName: String
    type: String
  }
`;

const UserFriendsType = `
  type UserFriendsType {
    friendId: String
    friendName: String
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
    friends: [UserFriendsType]
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

const declineFriendRequest = `
  declineFriendRequest(userInput: UserInputTypeFriendRequest): notificationType
`;

const createFriendRequest = `
  createFriendRequest(userInput: UserInputTypeFriendRequest): notificationType
`;

const dropFriendRequest = `
  dropFriendRequest(userInput: UserInputTypeFriendRequest): Boolean
`;

const acceptFriendRequest = `
  acceptFriendRequest(userInput: UserInputTypeFriendRequest): notificationType
`;

module.exports = {
  createUser,
  UserType,
  UserWaitingFriendsType,
  UserFriendsType,
  UserInputTypeId,
  UserInputTypeSignUp,
  UserInputTypeLogin,
  UserInputTypeName,
  UserInputTypeFriendRequest,
  UserInputTypeFriend,
  findUser,
  findUserById,
  findUserByName,
  dropWaitingFriend,
  declineFriendRequest,
  createFriendRequest,
  dropFriendRequest,
  acceptFriendRequest,
};
