const nodeMailer  = require('nodemailer');
const queryString = require('querystring');
const ejs         = require('ejs');
const path        = require('path');

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
      const templatePath = path.join(__dirname, '../', 'views', 'mails', 'verification-mail.ejs');

      ejs.renderFile(templatePath , { confirmToken: user.confirmToken, link: url }, (err, data) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        const options = {
          from: process.env.APP_MAIL_USER,
          to: user.email,
          subject: `${require('../configs/common.config')['appName']} account verification`,
          html: data
        }
        this.transporter.sendMail(options, (err, info) => {
          if(err) {
            reject(err);
          }
          resolve(info);
        });
      });
    });
  }

  sendAccountActivatedMail(user) {
    return new Promise((resolve, reject) => {
      
      const templatePath = path.join(__dirname, '../', 'views', 'mails', 'confirmation-mail.ejs');

      ejs.renderFile(templatePath, (err, data) => {
        if(err) {
          console.log(err);
          reject(err);
        }
        const options = {
          from: process.env.APP_MAIL_USER,
          to: user.email,
          subject: `${require('../configs/common.config')['appName']} account activated`,
          html: data
        }

        this.transporter.sendMail(options, (err, info) => {
          if(err) {
            reject(err);
          }
          resolve(info);
        });
      })
    });
  }


}

module.exports = new Mailer();