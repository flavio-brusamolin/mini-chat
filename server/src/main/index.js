const userController = require('./factories/user-controller-factory');
const userConnectedHandler = require('./factories/user-connected-handler-factory');
const messageReceivedHandler = require('./factories/message-received-handler-factory');
const HttpServer = require('../infra/http/http-server');
const WsServer = require('../infra/websocket/websocket-server');

function run() {
  const httpServer = new HttpServer();
  httpServer.on('post', '/users', userController.create.bind(userController));

  new WsServer({
    server: httpServer.getServer(),
    onConnectionHandler: userConnectedHandler.handle.bind(userConnectedHandler),
    onMessageHandler: messageReceivedHandler.handle.bind(messageReceivedHandler),
  });

  const port = process.env.PORT || 3030;
  httpServer.listen(port);
}

run();
