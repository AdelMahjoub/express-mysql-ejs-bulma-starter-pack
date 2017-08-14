const session = require('../server')['session'];
const connectionPool = require('../services/connectionPool.service');
const MySqlStore = require('express-mysql-session')(session);

// Create a session store using the imported connections pool
const sessionStore = new MySqlStore({}, connectionPool);

// session settings object
const sessionConfig = {
  secret: process.env.SESS_SECRET,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 86400000
  },
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  proxy: process.env.NODE_ENV === 'production' ? true : false,
}

module.exports = sessionConfig;