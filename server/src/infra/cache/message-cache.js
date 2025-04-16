const Redis = require('./redis');

class MessageCache {
  recentHistoryKey = 'chat:recent';

  constructor() {
    this.redis = new Redis();
  }

  async getRecentHistory() {
    const messages = await this.redis.get(this.recentHistoryKey);
    return messages ? JSON.parse(messages) : [];
  }

  async setRecentHistory(messages, ttlInSeconds) {
    await this.redis.set({
      key: this.recentHistoryKey,
      value: JSON.stringify(messages),
      ttl: ttlInSeconds,
    });
  }
}

module.exports = MessageCache;
