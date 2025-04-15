class UserCreatedHandler {
  constructor(sendEmailService) {
    this.sendEmailService = sendEmailService;
  }

  async handle(user) {
    await this.sendEmailService.execute(user);
  }
}

module.exports = UserCreatedHandler;
