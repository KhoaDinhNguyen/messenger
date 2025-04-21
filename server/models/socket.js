class Socket {
  constructor(userId, socketId) {
    this._userId = userId;
    this._socketId = socketId;
  }
  get userId() {
    return this._userId;
  }
  get socketId() {
    return this._socketId;
  }
}

class Sockets {
  constructor() {
    this._sockets = [];
  }
  insertSocket(userId, socketId) {
    this._sockets.push(new Socket(userId, socketId));
  }
  findSocketByUserId(userId) {
    // this._sockets.forEach((socket) => {
    //   console.log(socket);
    // });
    const foundSocket = this._sockets.filter(
      (socket) => socket.userId === userId
    );
    if (foundSocket.length === 0) {
      return null;
    }
    return foundSocket[0];
  }
  deleteSocketByUserId(userId) {
    let removedSocket;

    this._sockets = this._sockets.filter((socket) => {
      if (socket.userId === userId) {
        removedSocket = socket;
        return false;
      }
      return true;
    });
    //
    return removedSocket;
  }
}

module.exports = new Sockets();
