const MessageInputTypeSenderAndReceiver = `
  input MessageInputTypeSenderAndReceiver {
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const MessageInputTypeEmoji = `
  input MessageInputTypeEmoji {
    messageId: String!
    emoji: String
    commentId: String!
  }
`;

const MessageInputType = `
  input MessageInputType {
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
    text: String!
    images: [String]
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
    senderEmoji: String
    receiverEmoji: String
    images: [String]
    imagesUrl: [String]
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

const updateMessageEmoji = `
  updateMessageEmoji(messageInput: MessageInputTypeEmoji!): MessageType
`;

const generateImagesUrl = `

`;
module.exports = {
  MessageInputType,
  MessageInputTypeEmoji,
  MessageType,
  MessageInputTypeSenderAndReceiver,
  createMessage,
  getMessage,
  getLatestMessages,
  updateHaveSeenMessages,
  updateMessageEmoji,
};
