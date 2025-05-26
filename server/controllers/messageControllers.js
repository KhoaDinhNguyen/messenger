const User = require("../models/user");
const Message = require("../models/message");
const Sockets = require("../models/socket");

const io = require("../socket");

const { getImageFromS3 } = require("../s3");

module.exports = {
  createMessage: async function ({ messageInput }, req) {
    const {
      senderId,
      senderName,
      receiverId,
      receiverName,
      text,
      images,
      replyOf,
    } = messageInput;

    const generateImagesUrlPromises = images.map((image) =>
      getImageFromS3({ filename: image })
    );

    const imagesUrl = await Promise.all(generateImagesUrlPromises);

    //TODO: check have seen
    const newMessage = new Message({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      receiverName: receiverName,
      text: text,
      haveSeen: false,
      senderEmoji: "",
      receiverEmoji: "",
      images: images,
      imagesUrl: imagesUrl,
      replyOf: replyOf,
      senderHidden: false,
      receiverHidden: false,
    });

    try {
      await newMessage.save();
      //newMessage._id = newMessage._id;

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO().to(foundSocket.socketId).emit("message", {
          action: "create",
          message: newMessage,
        });
        //console.log(`emit to ${receiverId} -- id: ${foundSocket.socketId}`);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }

    return newMessage;
  },
  getMessage: async function ({ messageInput }, req) {
    const { senderId, receiverId } = messageInput;

    try {
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId, senderHidden: false },
          { senderId: receiverId, receiverId: senderId, receiverHidden: false },
        ],
      }).sort({ createdAt: -1 });

      //TODO: fix this
      const promises = messages.map(async (message) => {
        const images = message.images;
        if (images.length > 0) {
          const generateImagesUrlPromises = images.map((image) =>
            getImageFromS3({ filename: image })
          );
          const imagesUrl = await Promise.all(generateImagesUrlPromises);
          message.imagesUrl = imagesUrl;
        }

        return message;
      });

      const returnedMessages = await Promise.all(promises);

      return returnedMessages;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getLatestMessages: async function ({ userInput }, req) {
    const { id } = userInput;

    try {
      const friendList = await User.findById(id, { friends: 1 });
      const friendIdList = friendList
        .toObject()
        .friends.map((friend) => friend.friendId);

      const promises = friendIdList.map(async (friendId) => {
        return Message.find({
          $or: [
            { senderId: id, receiverId: friendId, senderHidden: false },
            { senderId: friendId, receiverId: id, receiverHidden: false },
          ],
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .then((listOfMessage) => {
            return listOfMessage[0];
          });
      });

      const latestMessages = await Promise.all(promises);

      return latestMessages;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateHaveSeenMessages: async function ({ messageInput }, req) {
    const { senderId, senderName, receiverId, receiverName, text } =
      messageInput;
    try {
      await Message.updateMany(
        { senderId: senderId, receiverId: receiverId },
        { $set: { haveSeen: true } }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }

    return true;
  },
  updateMessageEmoji: async function ({ messageInput }, req) {
    const { messageId, emoji, commentId } = messageInput;

    try {
      const foundMessage = await Message.findById(messageId);

      let query;

      if (foundMessage.senderId.toString() === commentId) {
        query = { senderEmoji: emoji };
      } else {
        query = { receiverEmoji: emoji };
      }

      const updatedMessage = await foundMessage.updateOne(
        { $set: query },
        { new: true, timestamps: false }
      );

      if (
        foundMessage.receiverId.toString() !== foundMessage.senderId.toString()
      ) {
        const foundSocket = Sockets.findSocketByUserId(
          commentId === foundMessage.senderId.toString()
            ? foundMessage.receiverId.toString()
            : foundMessage.senderId.toString()
        );

        if (foundSocket !== null) {
          io.getIO().to(foundSocket.socketId).emit("message", {
            action: "updateEmoji",
            message: foundMessage,
            commentId: commentId,
            emoji: emoji,
          });
        }
      }

      return foundMessage;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getMessageById: async function ({ messageInput }, req) {
    const { messageId } = messageInput;

    try {
      return await Message.findById(messageId);
    } catch (err) {
      throw err;
    }
  },
  deleteMessageById: async function ({ messageInput }, req) {
    const { messageId, receiverId, senderId } = messageInput;

    try {
      //TODO: delete images / replyOf
      await Message.findByIdAndDelete(messageId);

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO()
          .to(foundSocket.socketId)
          .emit("message", {
            action: "delete",
            message: {
              messageId: messageId,
              receiverId: receiverId,
              senderId: senderId,
            },
          });
        //console.log(`emit to ${receiverId} -- id: ${foundSocket.socketId}`);
      }

      return true;
    } catch (err) {
      throw err;
    }
  },
  updateMessageSenderHidden: async function ({ messageInput }, req) {
    const { messageId } = messageInput;

    try {
      //TODO: replyOf
      const foundMessage = await Message.findById(messageId);

      if (foundMessage !== null) {
        if (foundMessage.receiverHidden === true) {
          await foundMessage.deleteOne();
          //TODO: replyOf, images
        } else {
          await Message.findByIdAndUpdate(
            messageId,
            {
              $set: { senderHidden: true },
            },
            {
              timestamps: false,
            }
          );
        }
      }
    } catch (err) {
      throw err;
    }
  },
  updateMessageReceiverHidden: async function ({ messageInput }, req) {
    const { messageId } = messageInput;

    try {
      //TODO: replyOf
      const foundMessage = await Message.findById(messageId);

      if (foundMessage !== null) {
        if (foundMessage.senderHidden === true) {
          await foundMessage.deleteOne();
        } else {
          await Message.findByIdAndUpdate(
            messageId,
            {
              $set: { receiverHidden: true },
            },
            {
              timestamps: false,
            }
          );
        }
      }

      return true;
    } catch (err) {
      throw err;
    }
  },
  updateMessageContent: async function ({ messageInput }, req) {
    const { messageId, text, images, replyOf } = messageInput;

    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        {
          $set: {
            text: text,
            images: images,
            replyOf: replyOf,
          },
        },
        { new: true }
      );

      if (
        updatedMessage.receiverId.toString() !==
        updatedMessage.senderId.toString()
      ) {
        const foundSocket = Sockets.findSocketByUserId(
          updatedMessage.receiverId.toString()
        );

        if (foundSocket !== null) {
          io.getIO().to(foundSocket.socketId).emit("message", {
            action: "updateContent",
            message: updatedMessage,
          });
        }
      }

      return updatedMessage;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
