const knex = require('./knex');

class MessageRepository {
  async list(limit) {
    const messages = await knex('messages').orderBy('created_at', 'desc').limit(limit);
    return messages;
  }
}

module.exports = MessageRepository;
