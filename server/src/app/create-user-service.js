const { USER_CREATED } = require('./enum/enum-event');

class CreateUserService {
  constructor({ userRepository, messageQueueClient }) {
    this.userRepository = userRepository;
    this.messageQueueClient = messageQueueClient;
  }

  async execute(user) {
    const createdUser = await this.userRepository.create(user);
    await this.messageQueueClient.publish(USER_CREATED, createdUser);
    return createdUser;
  }
}

module.exports = CreateUserService;
