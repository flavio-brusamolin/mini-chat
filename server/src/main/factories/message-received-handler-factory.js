const UserRepository = require('../../infra/db/user-repository');
const MessageRepository = require('../../infra/db/message-repository');
const MessageCache = require('../../infra/cache/message-cache');
const WebSocketClient = require('../../infra/websocket/websocket-client');
const SendMessageService = require('../../app/send-message-service');
const MessageReceivedHandler = require('../../interfaces/websocket/message-received-handler');

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const messageCache = new MessageCache();
const websocketClient = new WebSocketClient();
const sendMessageService = new SendMessageService({
  userRepository,
  messageRepository,
  messageCache,
  websocketClient,
});
const messageReceivedHandler = new MessageReceivedHandler(sendMessageService);

module.exports = messageReceivedHandler;
