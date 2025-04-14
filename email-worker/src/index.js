const { USER_CREATED } = require('./app/enum-event');
const AmqpProvider = require('./infra/message-queue/amqp-provider');
const userCreatedHandler = require('./main/factories/user-created-handler-factory');

async function run() {
  const amqpProvider = new AmqpProvider();
  await amqpProvider.subscribe(USER_CREATED, userCreatedHandler);

  console.log('Email worker is running');
}

run();
