const { MESSAGE_LIMIT, CACHE_TTL_IN_SECONDS } = require('./enum/enum-message-history');

class DeliverMessageHistoryService {
  constructor({ userRepository, messageRepository, messageCache, websocketClient }) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
    this.messageCache = messageCache;
    this.websocketClient = websocketClient;
  }

  async execute(connectedUserId) {
    const user = await this.userRepository.find(connectedUserId);
    if (!user) {
      throw new Error('Unregistered user');
    }

    let messages = await this.messageCache.getRecentHistory();
    if (!messages?.length) {
      messages = await this.messageRepository.list(MESSAGE_LIMIT);
      await this.messageCache.setRecentHistory(messages, CACHE_TTL_IN_SECONDS);
    }

    this.websocketClient.send(connectedUserId, messages);
  }
}

module.exports = DeliverMessageHistoryService;
