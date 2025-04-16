const { WebSocketServer } = require('ws');

class WsServer {
  INTERNAL_ERROR = 1011;

  constructor({ server, onConnectionHandler }) {
    this.onConnectionHandler = onConnectionHandler;
    this.wsServer = new WebSocketServer({ server });
    this.wsServer.on('connection', (socket, req) => this.handleConnection(socket, req));
  }

  async handleConnection(socket, req) {
    try {
      const params = this.extractParams(req.url);
      const response = await this.onConnectionHandler(params);
      socket.send(JSON.stringify(response));
    } catch (exception) {
      console.error(exception);
      socket.send(JSON.stringify({ error: exception.message }));
      socket.close(this.INTERNAL_ERROR);
    }
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
