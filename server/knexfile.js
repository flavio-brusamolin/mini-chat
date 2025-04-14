module.exports = {
  client: 'pg',
  connection: process.env.POSTGRES_URL || 'postgres://pguser:pgpass@localhost:5432/mini-chat',
  migrations: {
    directory: './migrations',
  },
};
