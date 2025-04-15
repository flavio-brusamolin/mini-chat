const UserRepository = require('../../infra/db/user-repository');
const MessageQueueClient = require('../../infra/message-queue/message-queue-client');
const CreateUserService = require('../../app/create-user-service');
const UserController = require('../../interfaces/http/user-controller');

const userRepository = new UserRepository();
const messageQueueClient = new MessageQueueClient();
const createUserService = new CreateUserService({ userRepository, messageQueueClient });
const userController = new UserController(createUserService);

module.exports = userController;
