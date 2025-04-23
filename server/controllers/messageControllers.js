const User = require("../models/user");
const Message = require("../models/message");
const Sockets = require("../models/socket");

const io = require("../socket");

module.exports = {
  createMessage: async function ({ messageInput }, req) {
    const { senderId, senderName, receiverId, receiverName, text, haveSeen } =
      messageInput;

    const newMessage = new Message({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      receiverName: receiverName,
      text: text,
      haveSeen: haveSeen,
    });

    try {
      await newMessage.save();
      newMessage._id = newMessage._id;

      const foundSocket = Sockets.findSocketByUserId(receiverId);
      if (foundSocket !== null) {
        io.getIO().to(foundSocket.socketId).emit("message", {
          action: "create",
          message: newMessage,
        });
        console.log(`emit to ${receiverId}`);
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
      const messages = Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ createdAt: -1 });

      return messages;
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
            { senderId: id, receiverId: friendId },
            { senderId: friendId, receiverId: id },
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
};
