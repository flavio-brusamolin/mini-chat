const UserRepository = require('../../infra/db/user-repository');
const MessageRepository = require('../../infra/db/message-repository');
const MessageCache = require('../../infra/cache/message-cache');
const GetMessageHistoryService = require('../../app/get-message-history-service');
const UserConnectedHandler = require('../../interfaces/websocket/user-connected-handler');

const userRepository = new UserRepository();
const messageRepository = new MessageRepository();
const messageCache = new MessageCache();
const getMessageHistoryService = new GetMessageHistoryService({ userRepository, messageRepository, messageCache });
const userConnectedHandler = new UserConnectedHandler(getMessageHistoryService);

module.exports = userConnectedHandler;
