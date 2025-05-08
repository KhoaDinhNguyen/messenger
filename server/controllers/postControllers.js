const Post = require("../models/post");
const User = require("../models/user");

const { getImageFromS3 } = require("../s3");

module.exports = {
  createPost: async function ({ postInput }, req) {
    const { creatorId, creatorName, title, content, modifiers, images } =
      postInput;
    const generateImagesUrlPromises = images.map((image) =>
      getImageFromS3({ filename: image })
    );

    const imagesUrl = await Promise.all(generateImagesUrlPromises);

    const newPost = new Post({
      creatorId: creatorId,
      creatorName: creatorName,
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

      return posts;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
