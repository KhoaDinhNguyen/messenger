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

const CommentInputTypeId = `
  input CommentInputTypeId {
    commentIdArray: [String!]!
  }
`;
const createCommentFromPost = `
  createCommentFromPost(postInput: CommentInputTypePost): CommentType
`;

const getComments = `
  getComments(commentInput: CommentInputTypeId): [CommentType]
`;
module.exports = {
  CommentType,
  CommentInputTypePost,
  createCommentFromPost,
  getComments,
  CommentInputTypeId,
};
