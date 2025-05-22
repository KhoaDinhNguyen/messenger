const CommentType = `
  type CommentType {
    id: String
    creatorId: String
    creatorName: String
    comments: [String]
    text: String
    images: [String]
    imagesUrl: [String]
    createdAt: String
    updatedAt: String
    level: Int
    emoji: [String]
  }
`;

const CommentInputTypePost = `
  input CommentInputTypePost {
    postId: String!
    creatorId: String!
    creatorName: String
    text: String
    images: [String]
  }
`;

const CommentInputTypeComment = `
  input CommentInputTypeComment {
    commentId: String!
    creatorId: String!
    creatorName: String
    text: String
    images: [String]
    level: Int
  }
`;

const CommentInputTypeId = `
  input CommentInputTypeId {
    commentIdArray: [String!]!
  }
`;

const CommentInputUpdateEmoji = `
  input CommentInputUpdateEmoji {
    commentId: String!
    emojiCreatorId: String!
    emoji: String!
  }
`;

const createCommentFromPost = `
  createCommentFromPost(postInput: CommentInputTypePost): CommentType
`;

const createCommentFromComment = `
  createCommentFromComment(commentInput: CommentInputTypeComment): CommentType
`;

const getComments = `
  getComments(commentInput: CommentInputTypeId): [CommentType]
`;

const updateCommentEmoji = `
  updateCommentEmoji(commentInput: CommentInputUpdateEmoji): Boolean
`;

module.exports = {
  types: [CommentType],
  inputTypes: [
    CommentInputTypePost,
    CommentInputTypeId,
    CommentInputTypeComment,
    CommentInputUpdateEmoji,
  ],
  queries: [getComments],
  mutations: [
    createCommentFromComment,
    createCommentFromPost,
    updateCommentEmoji,
  ],
};
