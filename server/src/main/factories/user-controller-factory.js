const UserRepository = require('../../infra/db/user-repository');
const MessageQueueClient = require('../../infra/message-queue/message-queue-client');
const UserService = require('../../app/user-service');
const UserController = require('../../interfaces/http/user-controller');

const userRepository = new UserRepository();
const messageQueueClient = new MessageQueueClient();
const userService = new UserService({ userRepository, messageQueueClient });
const userController = new UserController(userService);

module.exports = userController;
