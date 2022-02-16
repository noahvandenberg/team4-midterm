const db = require('../db');

// Gets all points in DB
const allPoints = async () => {
  const strQuery = `SELECT * FROM points;`;
  const dbResponse = await db.query(strQuery)
  return dbResponse.rows
};
exports.allPoints = allPoints;


// Gets all points for a user
const mapPointsByUser = async (userId) => {
  const values = [userId];
  const strQuery = `
    SELECT * FROM points
    WHERE creator_id = $1;`;
  const dbResponse = await db.query(strQuery,values)
  return dbResponse.rows
};
exports.mapPointsByUser = mapPointsByUser;


// Gets all points for a map
const mapPoints = async (mapId) => {
  const values = [mapId];
  const strQuery = `
    SELECT * FROM points
    JOIN maps_points ON point_id = points.id
    JOIN maps ON map_id = maps.id
    WHERE map_id = $1;`;
  const dbResponse = await db.query(strQuery,values)
  return dbResponse.rows
};
exports.mapPoints = mapPoints;


// Gets a point by id
const findPoint = async (pointId) => {
  const values = [pointId];
  const strQuery = `SELECT * FROM points WHERE id = $1;`;
  const dbResponse = await db.query(strQuery,values)
  return dbResponse.rows
};
exports.findPoint = findPoint;


// Edits a point
const editPoint = async (user, body) => {
  const values = Object.values(body);
  let strQuery = 'UPDATE points SET ';
  switch (values.shift()) {
  case 'title':
    strQuery += 'title = ';
    break;
  case 'description':
    strQuery += 'description = ';
    break;
  case 'image_url':
    strQuery += 'image_url = ';
    break;
  }
  strQuery += `$1
    WHERE id = $2
    RETURNING *;`;
  const dbResponse = await db.query(strQuery,values)
  return dbResponse.rows
};
exports.editPoint = editPoint;

// Creates a new map point
const newPoint = async (point) => {
  const values = [point.creator_id, point.title, point.description, point.image_url, point.latitude, point.longitude];
  const strQuery = `
    INSERT INTO points (creator_id, time_created, title, description, image_url, latitude, longitude)
    VALUES ($1, Date.now(), $2, $3, $4, $5, $6)
    RETURNING *;`;
  const dbResponse = await db.query(strQuery,values)
  return dbResponse.rows[0]
};
exports.newPoint = newPoint;


// Creates a new map point
const deletePoint = async (point) => {
  const values = [point];
  const strQuery = `
      DELETE FROM points
      WHERE id = $1
      RETURNING *;`;
    const dbResponse = await db.query(strQuery,values)
    return dbResponse.rows[0]
};
exports.deletePoint = deletePoint;
