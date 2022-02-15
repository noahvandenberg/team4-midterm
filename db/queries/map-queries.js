
const db = require('../db');


const allMaps = function() {
  const strQuery = `SELECT * FROM maps;`;
  return db
    .query(strQuery)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message));
};
exports.allMaps = allMaps;


const findUserMaps = function(userId) {
  const values = [userId];
  const strQuery = `SELECT * FROM maps WHERE creator_id = $1;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message, 'at findUser'));
};
exports.findUserMaps = findUserMaps;


const addUserMap = function(userId) {
  const values = [userId, Date.now()];
  let strQuery = 'INSERT INTO maps (creator_id, time_created) VALUES ($1, $2) RETURNING *;';
  return db
    .query(strQuery, values)
    .then(result => result.rows[0])
    .catch(err => console.log('Error:', err.message));
};
exports.addUserMap = addUserMap;


const deleteUserMap = function(mapId) {
  const values = [mapId];
  const strQuery = `DELETE FROM maps WHERE id = $1;`;
  return db
    .query(strQuery, values)
    .then(result => console.log(result))
    .catch(err => console.log('Error:', err.message));
};
exports.deleteUserMap = deleteUserMap;
