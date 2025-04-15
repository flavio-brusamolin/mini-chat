const SendEmailService = require('../../app/send-email-service');
const EmailProvider = require('../../infra/email/email-provider');
const UserCreatedHandler = require('../../interfaces/amqp/user-created-handler');

const emailProvider = new EmailProvider();
const sendEmailService = new SendEmailService(emailProvider);
const userCreatedHandler = new UserCreatedHandler(sendEmailService);

module.exports = userCreatedHandler;
