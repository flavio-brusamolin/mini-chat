class UserCreatedHandler {
  constructor(emailService) {
    this.emailService = emailService;
  }

  async handle(user) {
    await this.emailService.sendWelcomeEmail(user);
  }
}

module.exports = UserCreatedHandler;
