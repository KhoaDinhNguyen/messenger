const Post = require("../models/post");
const User = require("../models/user");
const Emoji = require("../models/emoji");

const { getImageFromS3 } = require("../s3");

module.exports = {
  createPost: async function ({ postInput }, req) {
    const {
      creatorId,
      creatorName,
      creatorImage,
      title,
      content,
      modifiers,
      images,
    } = postInput;

    const generateImagesUrlPromises = images.map((image) =>
      getImageFromS3({ filename: image })
    );

    const imagesUrl = await Promise.all(generateImagesUrlPromises);

    const creatorImageUrl = await getImageFromS3({
      filename: creatorImage,
    });

    const newPost = new Post({
      creatorId: creatorId,
      creatorName: creatorName,
      creatorImage: creatorImage,
      creatorImageUrl: creatorImageUrl,
      title: title,
      content: content,
      modifiers: modifiers,
      images: images,
      imagesUrl: imagesUrl,
    });

    try {
      await newPost.save();

      return newPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getPost: async function ({ userInput }, req) {
    const { id } = userInput;

    try {
      const user = await User.findById(id);

      const allIds = user.friends.map((friend) => {
        return friend.friendId;
      });

      const friendsId = allIds.filter((friendId) => friendId.toString() !== id);

      const posts = await Post.find({
        $or: [
          {
            creatorId: { $in: friendsId },
            $or: [{ modifiers: "Public" }, { modifiers: "Friends" }],
          },
          {
            creatorId: id,
          },
        ],
      }).sort({ createdAt: -1 });

      const newPost = posts.map(async (post) => {
        const generateImagesUrlPromises = post.images.map((image) =>
          getImageFromS3({ filename: image })
        );

        const imagesUrl = await Promise.all(generateImagesUrlPromises);

        post.imagesUrl = imagesUrl;
        post.creatorImageUrl = await getImageFromS3({
          filename: post.creatorImage,
        });

        return post;
      });

      return newPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updatePostEmoji: async function ({ postInput }, req) {
    const { postId, emojiCreatorId, emoji } = postInput;

    try {
      const foundEmoji = await Emoji.findOne({
        postId: postId,
        emojiCreatorId: emojiCreatorId,
      });

      if (foundEmoji === null) {
        const newEmoji = new Emoji({
          emojiCreatorId: emojiCreatorId,
          postId: postId,
          emoji: emoji,
          commentId: null,
        });

        await newEmoji.save();

        await Post.findById(postId).updateOne({
          $push: {
            emoji: newEmoji.id,
          },
        });
      } else {
        if (foundEmoji.emoji !== emoji) {
          await foundEmoji.updateOne({
            emoji: emoji,
          });
        } else {
          await Promise.all([
            Post.findById(postId).updateOne({
              $pull: { emoji: foundEmoji.id },
            }),
            Emoji.findByIdAndDelete(foundEmoji.id),
          ]);
        }
      }
    } catch (err) {
      throw err;
    }

    return true;
  },
};
