const { WebSocketServer } = require('ws');
const WebSocketClient = require('./websocket-client');
const { INTERNAL_ERROR } = require('./error-code');

class WsServer {
  constructor({ server, onConnectionHandler, onMessageHandler }) {
    this.onConnectionHandler = onConnectionHandler;
    this.onMessageHandler = onMessageHandler;
    this.websocketClient = new WebSocketClient();

    const websocketServer = new WebSocketServer({ server });
    websocketServer.on('connection', (socket, req) => this.manageConnection(socket, req));
  }

  async manageConnection(socket, req) {
    try {
      const { user_id: userId } = this.extractParams(req.url);
      if (!userId) {
        throw new Error('user_id is required');
      }

      await this.handleConnection(userId, socket);
      socket.on('message', (data) => this.handleMessage(userId, data));
      socket.on('close', () => this.handleClose(socket));
    } catch (exception) {
      console.error(exception);
      socket.send(JSON.stringify({ error: exception.message }));
      socket.close(INTERNAL_ERROR);
    }
  }

  async handleConnection(userId, socket) {
    this.websocketClient.add(userId, socket);
    await this.onConnectionHandler(userId);
  }

  async handleMessage(userId, data) {
    await this.onMessageHandler(userId, data.toString());
  }

  handleClose(socket) {
    this.websocketClient.remove(socket);
  }

  extractParams(url) {
    const [, queryString] = url.split('?');
    if (!queryString) {
      return {};
    }

    const queryParams = new URLSearchParams(queryString);
    const queryParamsObj = {};
    for (const [key, value] of queryParams.entries()) {
      queryParamsObj[key] = value;
    }

    return queryParamsObj;
  }
}

module.exports = WsServer;
