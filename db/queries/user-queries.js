const res = require('express/lib/response');
const db = require('../../lib/db');
const chalk = require('chalk')



// BROWSE
const allUsers = async () => {
  try {
    const query = {
      text: 'SELECT * FROM users;',
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ allusers:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.allUsers = allUsers;



// READ
const findUserById = async (userId) => {
  try {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1;',
      values: [userId],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ findUserByID:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findUserById = findUserById;

const findUserByEmail = async (userEmail) => {
  try {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1;',
      values: [userEmail],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ findUserByID:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findUserByEmail = findUserByEmail;



// EDIT
const updateUserEmail = async (userID,newEmail) => {
  try {
    const query = {
      text: 'UPDATE users SET email = $1 WHERE id = $2 RETURNING *;',
      values: [newEmail, userID],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ updateUserEmail:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.updateUserEmail = updateUserEmail

const updateUserName = async (userID,newName) => {
  try {
    const query = {
      text: 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *;',
      values: [newName, userID],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ updateUserName:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.updateUserName = updateUserName

const updateUserPassword = async (userID,newPassword) => {
  try {
    const query = {
      text: 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *;',
      values: [newPassword, userID],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ updateUserPassword:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.updateUserPassword = updateUserPassword

const updateUserImageURL = async (userID,newImageURL) => {
  try {
    const query = {
      text: 'UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *;',
      values: [newImageURL, userID],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ updateUserImageURL:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.updateUserImageURL = updateUserImageURL


// ADD
const createUser = async (user) => {
  try {
    const query = {
      text: 'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *;',
      values: [user.email, user.firstName, user.lastName, user.password],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ createUser:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.createUser = createUser;



// DELETE
const deleteUser = async (userID) => {
  try {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING *;',
      values: [userID],
    }
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in user-queries.js @ deleteUser:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.deleteUser = deleteUser;
