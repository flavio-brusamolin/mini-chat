const { OPEN } = require('ws');
const { GOING_AWAY } = require('./error-code');

let instance;

class WebSocketClient {
  clients = {};

  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  add(userId, socket) {
    const currentUserSocket = this.clients[userId];

    if (currentUserSocket) {
      currentUserSocket.send(JSON.stringify({ error: 'Another connection established' }));
      currentUserSocket.close(GOING_AWAY);
    }

    this.clients[userId] = socket;
  }

  remove(socket) {
    this.clients = this.removeKeyByValue(this.clients, socket);
  }

  send(userId, data) {
    const socket = this.clients[userId];
    if (socket.readyState === OPEN) {
      socket.send(JSON.stringify(data));
    }
  }

  broadcast(senderUserId, data) {
    for (const userId of Object.keys(this.clients)) {
      if (userId !== senderUserId) {
        this.send(userId, data);
      }
    }
  }

  removeKeyByValue(object, valueToRemove) {
    for (const [key, value] of Object.entries(object)) {
      if (value === valueToRemove) {
        delete object[key];
        break;
      }
    }
    return object;
  }
}

module.exports = WebSocketClient;
