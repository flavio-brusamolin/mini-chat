const knex = require('./knex');

class UserRepository {
  async create(user) {
    const [createdUser] = await knex('users').insert(user).returning('*');
    return createdUser;
  }
}

module.exports = UserRepository;
