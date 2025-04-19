let io;
require("dotenv").config();

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: [process.env.FRONTEND_API],
        methogs: ["GET", "POST"],
      },
    });
    console.log("IO connect successfully");
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket have not init");
    }
    return io;
  },
};
