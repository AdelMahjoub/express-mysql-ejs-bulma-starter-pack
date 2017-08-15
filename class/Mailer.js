const nodeMailer = require('nodemailer');
const queryString = require('querystring');

class Mailer {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.APP_MAIL_HOSTNAME,
      port: process.env.APP_MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.APP_MAIL_USER,
        pass: process.env.APP_MAIL_PASS
      }
    });
  }

  sendVerificationMail(user, hostname) {
    return new Promise((resolve, reject) => {

      const url = `${hostname}/confirm`;

      const options = {
        from: process.env.APP_MAIL_USER,
        to: user.email,
        subject: `${require('../configs/common.config')['appName']} account verification`,
        text: `
          Confirmation token: ${user.confirmToken}
          Confirmation link : ${url}`
      }

      this.transporter.sendMail(options, (err, info) => {
        if(err) {
          reject(err);
        }
        resolve(info);
      });
    });
  }

  sendAccountActivatedMail(user) {
    return new Promise((resolve, reject) => {
      const query = queryString.stringify({
        id: user.id,
        token: user.confirmToken
      });
     
      const options = {
        from: process.env.APP_MAIL_USER,
        to: user.email,
        subject: `${require('../configs/common.config')['appName']} account activated`,
        text: `
        Your account has been activated with success.
        Email address: ${user.email}
        Username     : ${user.username}`
      }

      this.transporter.sendMail(options, (err, info) => {
        if(err) {
          reject(err);
        }
        resolve(info);
      });
    });
  }


}

module.exports = new Mailer();