const EmailService = require('../../app/email-service');
const EmailProvider = require('../../infra/email/email-provider');
const UserCreatedHandler = require('../../interfaces/amqp/user-created-handler');

const emailProvider = new EmailProvider();
const emailService = new EmailService(emailProvider);
const userCreatedHandler = new UserCreatedHandler(emailService);

module.exports = userCreatedHandler;
