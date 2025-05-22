const emojiInputId = `
  input emojiInputId {
    emojiIdArray: [String]
  }
`;

const emojiType = `
  type emojiType {
    emojiCreatorId: String
    emoji: String
    postId: String
    commentId: String
  }
`;

const getEmoji = `
  getEmoji(emojiInput: emojiInputId): [emojiType]
`;

module.exports = {
  types: [emojiType],
  inputTypes: [emojiInputId],
  queries: [getEmoji],
  mutations: [],
};
