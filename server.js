require('dotenv').config();
require('./configs/passport-google.config')();
require('./configs/passport-local.config.js')();

const express     = require('express');
const session     = require('express-session');
const cookieParer = require('cookie-parser');
const flash       = require('connect-flash');
const path        = require('path');
const passport    = require('passport');
const helmet      = require('helmet');
const compression = require('compression');
const minifyHtml  = require('express-minify-html');
const minify      = require('express-minify');

module.exports.session = session;

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views', 'pages'));

app.use(helmet());
app.use(cookieParer(process.env.SESS_SECRET));
app.use(session(require('./configs/session.config')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(compression(require('./configs/compression.config')));
app.use(minifyHtml(require('./configs/html-minify.config')));
app.use(minify({
  cache: path.join(__dirname, 'cache')
}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) => {
  app.locals.Form = require('./class/Form');
  app.locals.Message = require('./class/Message');
  app.locals.authUser = req.user;
  app.locals.title = require('./configs/common.config')['appName'];
  app.locals.reCaptchaPublic = process.env.RECAPTCHA_PUBLIC;
  app.locals.errors = req.flash('error');
  app.locals.infos = req.flash('info');
  next();
});

app.use(require('./routes/router'));

app.listen(app.get('port'), () => {
  if(app.get('env') === 'development') {
    console.log(`Server running on ${app.get('env')} mode, on port: ${app.get('port')}`);
  }
});