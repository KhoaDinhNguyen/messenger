import { Manager } from "socket.io-client";

let socket;

const Socket = {
  init: function (userid) {
    const manager = new Manager(process.env.REACT_APP_SERVER_API, {
      autoConnect: true,
      query: {
        userid: userid,
      },
    });
    socket = manager.socket("/");
    socket.connect();
    return socket;
  },
  getSocket: function () {
    return socket;
  },
  disconnect: function () {
    socket.disconnect();
    socket = undefined;
    return true;
  },
};

export default Socket;
