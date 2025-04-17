const { MESSAGE_LIMIT, CACHE_TTL_IN_SECONDS } = require('./enum/enum-message-history');

class SendMessageService {
  constructor({ userRepository, messageRepository, messageCache, websocketClient }) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
    this.messageCache = messageCache;
    this.websocketClient = websocketClient;
  }

  async execute(senderUserId, messageContent) {
    const user = await this.userRepository.find(senderUserId);
    if (!user) {
      throw new Error('Unregistered user');
    }

    const message = { content: messageContent };
    const createdMessage = await this.messageRepository.create(senderUserId, message);

    const cachedHistory = await this.messageCache.getRecentHistory();
    const updatedHistory = this.appendMessage(cachedHistory, createdMessage);
    await this.messageCache.setRecentHistory(updatedHistory, CACHE_TTL_IN_SECONDS);

    this.websocketClient.broadcast(senderUserId, createdMessage);
  }

  appendMessage(history, message) {
    history.unshift(message);
    return history.slice(0, MESSAGE_LIMIT);
  }
}

module.exports = SendMessageService;
