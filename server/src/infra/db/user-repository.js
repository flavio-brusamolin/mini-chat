const knex = require('./knex');

class UserRepository {
  async create(user) {
    const [createdUser] = await knex('users').insert(user).returning('*');
    return createdUser;
  }

  async find(userId) {
    const user = await knex('users').where({ id: userId }).first();
    return user;
  }
}

module.exports = UserRepository;
