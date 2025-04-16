class GetMessageHistoryService {
  MESSAGE_LIMIT = 50;
  TTL_IN_SECONDS = 30;

  constructor({ userRepository, messageRepository, messageCache }) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
    this.messageCache = messageCache;
  }

  async execute(userId) {
    const user = await this.userRepository.find(userId);
    if (!user) {
      throw new Error('Unregistered user');
    }

    const cachedMessages = await this.messageCache.getRecentHistory();
    if (cachedMessages?.length) {
      return cachedMessages;
    }

    const messages = await this.messageRepository.list(this.MESSAGE_LIMIT);
    await this.messageCache.setRecentHistory(messages, this.TTL_IN_SECONDS);

    return messages;
  }
}

module.exports = GetMessageHistoryService;
