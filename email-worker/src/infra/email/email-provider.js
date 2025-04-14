const nodemailer = require('nodemailer');

class EmailProvider {
  async sendEmail({ to, subject, html }) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: 'Mini Chat App <mini-chat@example.com>',
      to,
      subject,
      html,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

module.exports = EmailProvider;
