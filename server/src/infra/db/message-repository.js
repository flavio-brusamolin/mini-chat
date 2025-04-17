const knex = require('./knex');

class MessageRepository {
  async list(limit) {
    const messages = await knex('messages').orderBy('created_at', 'desc').limit(limit);
    return messages;
  }

  async create(userId, message) {
    const [createdMessage] = await knex('messages')
      .insert({ user_id: userId, ...message })
      .returning('*');

    return createdMessage;
  }
}

module.exports = MessageRepository;
