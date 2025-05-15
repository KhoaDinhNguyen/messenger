const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const io = require("../socket");
const Sockets = require("../models/socket");

module.exports = {
  createCommentFromPost: async function ({ postInput }, req) {
    const { postId, creatorId, creatorName, text } = postInput;

    const newComment = new Comment({
      creatorId: creatorId,
      creatorName: creatorName,
      text: text,
      comments: [],
      images: [],
      level: 0,
    });

    try {
      const resComment = await newComment.save();

      const updatedPost = await Post.findById(postId);

      await updatedPost.updateOne({
        $push: { comments: newComment.id },
      });

      if (updatedPost.modifiers !== "Private") {
        const user = await User.findById(updatedPost.creatorId);

        const allIds = user.friends.map((friend) => {
          return friend.friendId;
        });

        const nonCreatorIds = allIds.filter(
          (friendId) => friendId.toString() !== creatorId
        );

        nonCreatorIds.forEach((id) => {
          const foundSocket = Sockets.findSocketByUserId(id.toString());
          if (foundSocket !== null) {
            io.getIO().to(foundSocket.socketId).emit("comment", {
              action: "createdFromPost",
              comment: resComment,
              postId: postId,
            });
          }
        });
      }
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
  createCommentFromComment: async function ({ commentInput }, req) {
    const { commentId, creatorId, creatorName, text, level } = commentInput;

    const newComment = new Comment({
      creatorId: creatorId,
      creatorName: creatorName,
      text: text,
      comments: [],
      images: [],
      level: level,
    });

    try {
      const resComment = await newComment.save();

      const updatedComment = await Comment.findById(commentId);

      await updatedComment.updateOne({
        $push: { comments: newComment.id },
      });

      const user = await User.findById(updatedComment.creatorId);

      const allIds = user.friends.map((friend) => {
        return friend.friendId;
      });

      const nonCreatorIds = allIds.filter(
        (friendId) => friendId.toString() !== creatorId
      );

      nonCreatorIds.forEach((id) => {
        const foundSocket = Sockets.findSocketByUserId(id.toString());
        if (foundSocket !== null) {
          io.getIO().to(foundSocket.socketId).emit("comment", {
            action: "createdFromComment",
            parentId: updatedComment.id,
            comment: resComment,
          });
        }
      });

      return newComment;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
