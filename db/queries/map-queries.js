
const db = require('../db');


const allMaps = async () => {
  const strQuery = `SELECT * FROM maps;`;
  const dbResponse = await db.query(strQuery)
  return dbResponse.rows
};
exports.allMaps = allMaps;


const findUserMaps = async (userId) => {
  const values = [userId];
  const strQuery = `SELECT * FROM maps WHERE creator_id = $1;`;
  const dbResponse = await db.query(strQuery)
  return dbResponse.rows
};
exports.findUserMaps = findUserMaps;


const addUserMap = async (userId) => {
  const values = [userId, Date.now()];
  let strQuery = 'INSERT INTO maps (creator_id, time_created) VALUES ($1, $2) RETURNING *;';
  const dbResponse = await db.query(strQuery)
  return dbResponse.rows[0]
};
exports.addUserMap = addUserMap;


const deleteUserMap = async (mapId) => {
  const values = [mapId];
  const strQuery = `DELETE FROM maps WHERE id = $1;`;
  const dbResponse = await db.query(strQuery)
  return dbResponse.rows
};
exports.deleteUserMap = deleteUserMap;
