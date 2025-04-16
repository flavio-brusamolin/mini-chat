const { createClient } = require('redis');

let instance;

class Redis {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  async init() {
    if (this.client) {
      return;
    }

    this.client = await createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    })
      .on('error', (err) => console.error('Redis client error', err))
      .connect();
  }

  async get(key) {
    if (!this.client) {
      await this.init();
    }

    return await this.client.get(key);
  }

  async set({ key, value, ttl }) {
    if (!this.client) {
      await this.init();
    }

    await this.client.set(key, value, { EX: ttl });
  }
}

module.exports = Redis;
