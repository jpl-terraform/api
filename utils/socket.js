const socketIo = require('socket.io');

class SocketIo {

  constructor() {}

  static io() {
    if(!SocketIo.socket) {
      SocketIo.socket = socketIo(process.env.SOCKET_PORT);
    }
    return SocketIo.socket;
  }
}

module.exports = SocketIo.io;
