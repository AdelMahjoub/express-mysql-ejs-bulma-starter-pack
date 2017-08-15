express-mysql-ejs-bulma-starter-pack
---------------------------------------
---------------------------------------
An express starter boilerplate with a google Single Sign On strategy and a basic authentication strategy.

HTML and backend forms validation.

reCaptcha2 validation.

Users accounts verification: accounts must be activated using a unique confirmation token sent to the user inbox.

The authentication strategies are buit using [passportjs](http://passportjs.org/docs).

Verification and activation emails are sent using [nodemailer](https://nodemailer.com/about/).

The starter pack include a User model built using [mysql](https://github.com/mysqljs/mysql) module, to interact with the Users table.

The styles are based on [bulma css](http://bulma.io/documentation/overview/start/).

The templating engine used is [ejs](http://ejs.co/).

**Users table:**
```
+--------------+------------------+------+-----+-------------------+----------------+
| Field        | Type             | Null | Key | Default           | Extra          |
+--------------+------------------+------+-----+-------------------+----------------+
| id           | int(10) unsigned | NO   | PRI | NULL              | auto_increment |
| googleId     | varchar(255)     | YES  | MUL | NULL              |                |
| username     | varchar(255)     | NO   |     | NULL              |                |
| email        | varchar(255)     | NO   | UNI | NULL              |                |
| password     | varchar(255)     | NO   |     | NULL              |                |
| signupDate   | timestamp        | NO   |     | CURRENT_TIMESTAMP |                |
| displayName  | varchar(255)     | YES  |     | NULL              |                |
| isAdmin      | tinyint(1)       | NO   |     | 0                 |                |
| confirmed    | tinyint(1)       | YES  |     | 0                 |                |
| confirmToken | varchar(255)     | YES  |     | NULL              |                |
+--------------+------------------+------+-----+-------------------+----------------+

CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `googleId` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `signupDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `displayName` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `confirmed` tinyint(1) DEFAULT '0',
  `confirmToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  FULLTEXT KEY `idx_google_id` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

```

**Usage:**

Add a ***.env*** file at the root folder
```
SESS_SECRET=[session secret phrase]'
DB_USER=[database username]
DB_PASS=[database password]
DB_URL=[database host]
DB_PORT=[database port number]
DB_NAME=[database name]
GOOGLE_CLIENT_ID=[oAuth2.0 google client id]
GOOGLE_CLIENT_SECRET=[oAuth2.0 google secret key]
GOOGLE_AUTH_CALLBACK=[oAuth2.0 authentication callback url]
RECAPTCHA_SECRET=[google reCaptcha v2 secret key]
RECAPTCHA_PUBLIC=[google reCaptcha v2 public key]
APP_MAIL_PASS=[mails sender's password]
APP_MAIL_USER=[mails sender: email address]
APP_MAIL_HOSTNAME=[mails sender's smtp server]
APP_MAIL_PORT=[mails sender's port number]

```
Install the dependencies: `$ npm install`

Run the development server: `$ npm run dev`

Run the production server: `$ npm start`
