const mysql = require('mysql');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const shortid = require('shortid');

// Database connection instance
const connectionPool = require('../services/connectionPool.service');
// User schema
const UserSchema = require('../class/UserSchema');

/**
 * User model
 */
class User extends UserSchema {
  constructor(props) {
    super(props);
  }
  
  /**
   * Return all registred users: for admin usage
   */
  static find() {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * FROM Users;`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Find a user by his/her email
   * @param { object: User } user 
   */
  static findByEmail(user) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * from Users WHERE email=${connection.escape(user.email)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          if(results.length === 0) {
            resolve(null);
          }
          resolve(results[0]);
        });
        connection.release();
      });
    });
  }
  
  /**
   * Find a user by id
   * @param { number } id 
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * from Users WHERE id=${connection.escape(id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          if(results.length === 0) {
            resolve(null);
          }
          resolve(results[0]);
        });
        connection.release();
      })
    });
  }

  /**
   * Find a user by google id
   * @param { string } googleId 
   */
  static findByGoogleId(googleId) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `SELECT * from Users WHERE googleId=${connection.escape(googleId)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          if(results.length === 0) {
            resolve(null);
          }
          resolve(results[0]);
        });
        connection.release();
      });
    });
  }

  /**
   * Insert a new user
   * @param { object: User } user 
   */
  static insert(user) {
    return new Promise((resolve, reject) => {
       User.hashPassword(user)
        .then(hash => {
          user.password = hash;
          connectionPool.getConnection((err, connection) => {
            if(err) {
              reject(err);
            }
            let confirmToken = shortid.generate();
            let confirmed = user['googleId'] ? 1: 0;
            let query = `INSERT INTO Users (googleId, username, email, password, displayName, confirmToken, confirmed)
            VALUES (
              ${connection.escape(user.googleId)},
              ${connection.escape(user.username)},
              ${connection.escape(user.email)},
              '${user.password}',
              ${connection.escape(user.displayName)},
              '${confirmToken}',
              '${confirmed}'
            )`;
            connection.query(query, (err, results, fields) => {
              if(err) {
                reject(err.message);
              }
              resolve(results);
            });
            connection.release();
          });
        });
    });
  }

  /**
   * Confirm user
   * @param {*} id 
   */
  static confirm(id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `UPDATE Users SET confirmed=1 WHERE id=${connection.escape(id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        })
        connection.release();
      })
    })
  } 
  
  /**
   * Update a user
   * @param { object: User } user 
   */
  static update(user) {

  }
  
  /**
   * Delete a user
   * @param { string } id 
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if(err) {
          reject(err);
        }
        let query = `DELETE FROM Users WHERE id=${connection.escape(id)}`;
        connection.query(query, (err, results, fields) => {
          if(err) {
            reject(err.message);
          }
          resolve(results);
        });
        connection.release();
      });
    });
  }

  /**
   * Compare passwords
   * @param { string } guess 
   * @param { string } encrypted 
   */
  static comparePasswords(guess, encrypted) {
    return bcrypt.compareSync(guess, encrypted);
  }

  /**
   * Encrypt user password
   * @param { object: User } user 
   */
  static hashPassword(user) {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.password, salt);
      resolve(hash); 
    });
  }
}

module.exports = User;
