const http = require('http');
const express = require('express');
const adaptRoute = require('./express-adapter');

class HttpServer {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.server = http.createServer(this.app);
  }

  getServer() {
    return this.server;
  }

  on(method, path, controller) {
    this.app[method](path, adaptRoute(controller));
  }

  listen(port) {
    this.server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
  }
}

module.exports = HttpServer;
