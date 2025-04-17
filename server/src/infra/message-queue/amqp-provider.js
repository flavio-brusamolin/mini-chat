const { connect } = require('amqplib');
const enumEvent = require('../../app/enum/enum-event');

let instance;

class AmqpProvider {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  async init() {
    await this._establishConnection();
    await this._createChannel();
    await this._assertQueues();
  }

  async _establishConnection() {
    if (!this.connection) {
      const uri = process.env.RABBITMQ_URL || 'amqp://rabbituser:rabbitpass@localhost:5672';
      this.connection = await connect(uri);
    }
  }

  async _createChannel() {
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }
  }

  async _assertQueues() {
    for (const queue of Object.values(enumEvent)) {
      await this.channel.assertQueue(queue, { durable: true });
    }
  }

  async publish(queue, message) {
    if (!this.channel) {
      await this.init();
    }

    const payload = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(queue, payload, { persistent: true });
  }
}

module.exports = AmqpProvider;
