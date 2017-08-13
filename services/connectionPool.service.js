const mysql = require('mysql');

const options = {
  connectionLimit: 10,
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

const connectionPool = mysql.createPool(options);

connectionPool.getConnection((err, connection) => {
  if(err) {
    return console.log('Unable to connect to the database, error: ',err.stack);
  }
  console.log('Connection to the database established, thread_id: ', connection.threadId);
  connection.release();
});

module.exports = connectionPool;