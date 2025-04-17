class UserConnectedHandler {
  constructor(deliverMessageHistoryService) {
    this.deliverMessageHistoryService = deliverMessageHistoryService;
  }

  async handle(connectedUserId) {
    await this.deliverMessageHistoryService.execute(connectedUserId);
  }
}

module.exports = UserConnectedHandler;
