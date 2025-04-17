class MessageReceivedHandler {
  constructor(sendMessageService) {
    this.sendMessageService = sendMessageService;
  }

  async handle(senderUserId, messageContent) {
    await this.sendMessageService.execute(senderUserId, messageContent);
  }
}

module.exports = MessageReceivedHandler;
