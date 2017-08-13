express-mysql-ejs-bulma-starter-pack
---------------------------------------
---------------------------------------
An express starter boilerplate with a google Single Sign On and a basic authentication strategies.

The authentication strategies are buit using [passportjs](http://passportjs.org/docs).

The starter pack include a User model built using [mysql](https://github.com/mysqljs/mysql) module, to interact with the Users table.

The styles are based on [bulma css](http://bulma.io/documentation/overview/start/).

The templating engine used is [ejs](http://ejs.co/)

**Users table:**
```
+-------------+------------------+------+-----+-------------------+----------------+
| Field       | Type             | Null | Key | Default           | Extra          |
+-------------+------------------+------+-----+-------------------+----------------+
| id          | int(10) unsigned | NO   | PRI | NULL              | auto_increment |
| googleId    | varchar(255)     | YES  | MUL | NULL              |                |
| username    | varchar(255)     | NO   |     | NULL              |                |
| email       | varchar(255)     | NO   | UNI | NULL              |                |
| password    | varchar(255)     | NO   |     | NULL              |                |
| signupDate  | timestamp        | NO   |     | CURRENT_TIMESTAMP |                |
| confirmed   | tinyint(1)       | NO   |     | 0                 |                |
| displayName | varchar(255)     | YES  |     | NULL              |                |
+-------------+------------------+------+-----+-------------------+----------------+
```

**Usage:**

Add a ***.env*** file at the root folder
```
SESS_SECRET=[secret phrase for the session]
DB_USER=[database user]
DB_PASS=[database password]
DB_URL=[database hostname]
DB_PORT=[database port]
DB_NAME=[database name]
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_AUTH_CALLBACK=
```
Install the dependencies: `$ npm install`

Run the development server: `$ npm run dev`

Run the production server: `$ npm start`
