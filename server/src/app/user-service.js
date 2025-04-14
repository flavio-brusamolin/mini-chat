const { USER_CREATED } = require('./enum-event');

class UserService {
  constructor({ userRepository, messageQueueClient }) {
    this.userRepository = userRepository;
    this.messageQueueClient = messageQueueClient;
  }

  async create(user) {
    const createdUser = await this.userRepository.create(user);
    await this.messageQueueClient.publish(USER_CREATED, createdUser);
    return createdUser;
  }
}

module.exports = UserService;
