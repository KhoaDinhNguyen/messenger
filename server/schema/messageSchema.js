const MessageInputTypeSenderAndReceiver = `
  input MessageInputTypeSenderAndReceiver {
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const MessageInputType = `
  input MessageInputType {
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
    text: String!
  }
`;

const MessageType = `
  type MessageType {
    _id: ID
    senderId: String
    senderName: String
    receiverId: String
    receiverName: String
    text: String
    createdAt: String
    updatedAt: String
    haveSeen: Boolean
  }
`;

const createMessage = `
  createMessage(messageInput: MessageInputType!) : MessageType
`;

const getMessage = `
  getMessage(messageInput: MessageInputTypeSenderAndReceiver!) : [MessageType]
`;

const getLatestMessages = `
  getLatestMessages(userInput: UserInputTypeId!) : [MessageType]
`;

const updateHaveSeenMessages = `
  updateHaveSeenMessages(messageInput: MessageInputTypeSenderAndReceiver!):  Boolean
`;

module.exports = {
  MessageInputType,
  MessageType,
  MessageInputTypeSenderAndReceiver,
  createMessage,
  getMessage,
  getLatestMessages,
  updateHaveSeenMessages,
};
