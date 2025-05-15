const PostInputType = `
  input PostInputType {
    creatorId: String!
    creatorName: String!
    creatorImage: String
    title: String
    content: String!
    modifiers: String!
    images: [String]
    imagesUrl: [String]
  }
`;

const PostType = `
  type PostType {
    _id: ID
    creatorId: String
    creatorName: String
    creatorImage: String
    creatorImageUrl: String
    title: String
    content: String
    comments: [String]
    images: [String]
    imagesUrl: [String]
    modifiers: String
    createdAt: String
    updatedAt: String
  }
`;

const createPost = `
  createPost(postInput: PostInputType): PostType
`;

const getPost = `
  getPost(userInput: UserInputTypeId): [PostType]
`;

module.exports = {
  PostInputType,
  PostType,
  createPost,
  getPost,
};
