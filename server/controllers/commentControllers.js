const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
  createCommentFromPost: async function ({ postInput }, req) {
    const { postId, creatorId, creatorName, text } = postInput;

    const newComment = new Comment({
      creatorId: creatorId,
      creatorName: creatorName,
      text: text,
      comments: [],
      images: [],
    });

    try {
      await newComment.save();

      await Post.findById(postId).updateOne({
        $push: { comments: newComment.id },
      });

      return newComment;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getComments: async function ({ commentInput }, req) {
    const { commentIdArray } = commentInput;

    try {
      const foundComments = Comment.find({ _id: { $in: commentIdArray } }).sort(
        { createdAt: -1 }
      );

      return foundComments;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
