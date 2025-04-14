const path = require('path');
const fs = require('fs');

class EmailService {
  constructor(emailProvider) {
    this.emailProvider = emailProvider;
  }

  async sendWelcomeEmail(user) {
    console.log(`Sending email to ${user.email}`);

    const emailPath = path.join(__dirname, 'welcome-email.html');
    const emailContent = fs.readFileSync(emailPath, 'utf8');
    const formattedEmailContent = emailContent.replace('{{USERNAME}}', user.username);

    const emailDetails = {
      to: user.email,
      subject: 'Bem-vindo!',
      html: formattedEmailContent,
    };

    await this.emailProvider.sendEmail(emailDetails);
  }
}

module.exports = EmailService;
