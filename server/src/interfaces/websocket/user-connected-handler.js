class UserConnectedHandler {
  constructor(getMessageHistoryService) {
    this.getMessageHistoryService = getMessageHistoryService;
  }

  async handle(connectionParams) {
    const { user_id: userId } = connectionParams;
    if (!userId) {
      throw new Error('user_id is required');
    }

    return await this.getMessageHistoryService.execute(userId);
  }
}

module.exports = UserConnectedHandler;
