const db = require('./db');

const allUsers = function() {
  const strQuery = `SELECT * FROM users;`;
  return db
    .query(strQuery)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message));
};
exports.allUsers = allUsers;

const findUser = function(strProperty, value) {
  const strQuery = `
    SELECT * FROM users where ${strProperty} = $1;`;
  console.log(strProperty, value, 'at findUser');
  return db
    .query(strQuery, [value])
    .then((result) => result.rows[0])
    .catch(err => console.log('Error:', err.message, 'at findUser'));
};
exports.findUser = findUser;

const editUser = function(user, body) {
  const values = Object.values(body);
  let strQuery = 'UPDATE users SET ';
  switch (values.shift()) {
  case 'email':
    strQuery += 'email = ';
    break;
  case 'first_name':
    strQuery += 'first_name = ';
    break;
  case 'last_name':
    strQuery += 'last_name = ';
    break;
  }
  strQuery += `$1
    WHERE id = $2
    RETURNING *;`;

  console.log(values);
  console.log(strQuery);
  return db
    .query(strQuery, values)
    .then(data => console.log(data))
    .catch(err => console.log('Error:', err.message));
};
exports.editUser = editUser;

const addUser = function(user) {
  const values = [user.email, user.first_name, user.last_name, 'password'];
  const strQuery = `
    INSERT INTO users (email, first_name, last_name, password)
    VALUES ($1, $2, $3, $4);`;

  return db
    .query(strQuery, values)
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err.message, 'at addUser'));
};
exports.addUser = addUser;

const deleteUser = function(user) {
  const values = [user.id];
  const strQuery = `
    DELETE FROM users
    WHERE id = $1;`;

  return db
    .query(strQuery, values)
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err.message));
};
exports.deleteUser = deleteUser;
