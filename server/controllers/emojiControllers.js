const Emoji = require("../models/emoji");

module.exports = {
  getEmoji: async function ({ emojiInput }, req) {
    const { emojiIdArray } = emojiInput;

    try {
      return await Emoji.find({ _id: { $in: emojiIdArray } });
    } catch (err) {
      throw err;
    }
  },
};
