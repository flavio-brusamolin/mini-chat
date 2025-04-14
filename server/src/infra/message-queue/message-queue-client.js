const AmqpProvider = require('./amqp-provider');

class MessageQueueClient {
  constructor() {
    this.amqpProvider = new AmqpProvider();
  }

  async publish(queue, message) {
    await this.amqpProvider.publish(queue, message);
  }
}

module.exports = MessageQueueClient;
