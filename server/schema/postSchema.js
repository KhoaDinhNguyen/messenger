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

const PostInputUpdateEmoji = `
  input PostInputUpdateEmoji {
    postId: String!
    emojiCreatorId: String!
    emoji: String!
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
    emoji: [String]
  }
`;

const createPost = `
  createPost(postInput: PostInputType): PostType
`;

const getPost = `
  getPost(userInput: UserInputTypeId): [PostType]
`;

const updatePostEmoji = `
  updatePostEmoji(postInput: PostInputUpdateEmoji): Boolean
`;

module.exports = {
  inputTypes: [PostInputType, PostInputUpdateEmoji],
  types: [PostType],
  mutations: [createPost, updatePostEmoji],
  queries: [getPost],
};
