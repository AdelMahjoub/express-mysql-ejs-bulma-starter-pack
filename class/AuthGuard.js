const https = require('https');
const queryString = require('querystring');
const User = require('../models/user.model');

class AuthGuard {
  constructor(props){ }

  static loginRequired(req, res, next) {
    if(!req.isAuthenticated()) {
      req.flash('info', ['Please signin to proceed']);
      return res.redirect('/signin');
    }
    return next();
  }

  static adminRequired(req, res, next) {
    if(!req.user['isAdmin']) {
      return res.render('unauthorized');
    }
    return next();
  }

  static reCaptcha(req, res, next) {

    const secret = process.env.RECAPTCHA_SECRET;
    const response = req.body['g-recaptcha-response'];
    
    const remoteip = 
      req.headers['x-forwarded-for'] ? 
        req.headers['x-forwarded-for'].split(',')[0] : 'localhost';

    const postData = queryString.stringify({ secret, response, remoteip });

    const options = {
      hostname: 'www.google.com',
      method: 'POST',
      path: '/recaptcha/api/siteverify',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const reCaptchaRequest = https.request(options, reCaptchaResponse => {
      let data = '';
      reCaptchaResponse.setEncoding('utf8');
      reCaptchaResponse.on('data', chunk => {
        data += chunk;
      });
      reCaptchaResponse.on('end', () => {
        data = JSON.parse(data);
        if(data['success'] === true) {
          return next();
        } else {
          req.flash('error', 'reCaptcha checkbox unchecked or expired, please try again');
          return res.redirect(req.url);
        }
      });
    });

    reCaptchaRequest.on('error', e => {
      console.log(e);
      req.flash('error', ['Unexpected error, please try again']);
      return res.redirect(req.url);
    });

    reCaptchaRequest.write(postData);
    reCaptchaRequest.end();
  }

  static confirmRequired(req, res, next) {
    let email = req.body['email'];
    User.findByEmail({email})
      .then(candidate => {
        if(candidate && parseInt(candidate.confirmed, 10) === 1) {
          return next();
        } else {
          req.flash('error', ['Account not yet confirmed, check your inbox for the activation token']);
          return res.redirect('/confirm');
        }
        req.flash('error', ['In valid email or password']);
        return res.redirect('/signin');
      })
      .catch(err => {
        console.log(err);
        req.flash('error', ['Unexpected error, please try again']);
        return res.redirect('/signin')
      })
  }
}

module.exports = AuthGuard;