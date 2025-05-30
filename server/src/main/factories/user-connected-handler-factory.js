const UserRepository = require('../../infra/db/user-repository');
const MessageRepository = require('../../infra/db/message-repository');
const MessageCache = require('../../infra/cache/message-cache');
const WebSocketClient = require('../../infra/websocket/websocket-client');
const DeliverMessageHistoryService = require('../../app/deliver-message-history-service');
const UserConnectedHandler = require('../../interfaces/websocket/user-connected-handler');

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const messageCache = new MessageCache();
const websocketClient = new WebSocketClient();
const deliverMessageHistoryService = new DeliverMessageHistoryService({
  userRepository,
  messageRepository,
  messageCache,
  websocketClient,
});
const userConnectedHandler = new UserConnectedHandler(deliverMessageHistoryService);

module.exports = userConnectedHandler;
