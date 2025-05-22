const userControllers = require("../controllers/userControllers");
const notificationControllers = require("../controllers/notificationControllers");
const messageControllers = require("../controllers/messageControllers");
const commentControllers = require("../controllers/commentControllers");
const postControllers = require("../controllers/postControllers");
const contactControllers = require("../controllers/contactControllers");
const emojiControllers = require("../controllers/emojiControllers");

module.exports = {
  ...userControllers,
  ...notificationControllers,
  ...messageControllers,
  ...postControllers,
  ...commentControllers,
  ...contactControllers,
  ...emojiControllers,
  hello() {
    return "Hello world";
  },
};
