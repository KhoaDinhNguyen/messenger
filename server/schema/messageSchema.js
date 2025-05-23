const MessageInputTypeSenderAndReceiver = `
  input MessageInputTypeSenderAndReceiver {
    senderId: String!
    senderName: String!
    receiverId: String!
    receiverName: String!
  }
`;

const MessageInputId = `
  input MessageInputId {
    messageId: String!
  }
`;

const MessageInputDelete = `
  input MessageInputDelete {
      messageId: String!
      receiverId: String!
      senderId: String!
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
    replyOf: String
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
    replyOf: String
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

const getMessageById = `
  getMessageById(messageInput: MessageInputId): MessageType
`;

const updateMessageSenderHidden = `
  updateMessageSenderHidden(messageInput: MessageInputId): Boolean
`;

const updateMessageReceiverHidden = `
  updateMessageReceiverHidden(messageInput: MessageInputId): Boolean
`;

const deleteMessageById = `
  deleteMessageById(messageInput: MessageInputDelete): Boolean
`;

module.exports = {
  types: [MessageType],
  inputTypes: [
    MessageInputType,
    MessageInputTypeEmoji,
    MessageInputTypeSenderAndReceiver,
    MessageInputId,
    MessageInputDelete,
  ],
  queries: [getMessage, getLatestMessages, getMessageById],
  mutations: [
    createMessage,
    updateHaveSeenMessages,
    updateMessageEmoji,
    deleteMessageById,
    updateMessageReceiverHidden,
    updateMessageSenderHidden,
  ],
};
