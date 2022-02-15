const db = require('../db');


const allPoints = function() {
  const strQuery = `SELECT * FROM points;`;
  return db
    .query(strQuery)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message));
};
exports.allPoints = allPoints;


const mapPointsByUser = function(userId) {
  const values = [userId];
  const strQuery = `
    SELECT * FROM points
    WHERE creator_id = $1;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message));
};
exports.mapPointsByUser = mapPointsByUser;


const mapPoints = function(mapId) {
  const values = [mapId];
  const strQuery = `
    SELECT * FROM points
    JOIN maps_points ON point_id = points.id
    JOIN maps ON map_id = maps.id
    WHERE map_id = $1;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows)
    .catch(err => console.log('Error:', err.message));
};
exports.mapPoints = mapPoints;


const findPoint = function(pointId) {
  const values = [pointId];
  const strQuery = `SELECT * FROM points WHERE id = $1;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows[0])
    .catch(err => console.log('Error:', err.message));
};
exports.findPoint = findPoint;

const editPoint = function(user, body) {
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
  return db
    .query(strQuery, values)
    .then(result => result.rows[0])
    .catch(err => console.log('Error:', err.message));
};
exports.editPoint = editPoint;


const newPoint = function(point) {
  const values = [point.creator_id, point.title, point.description, point.image_url, point.latitude, point.longitude];
  const strQuery = `
    INSERT INTO points (creator_id, time_created, title, description, image_url, latitude, longitude)
    VALUES ($1, Date.now(), $2, $3, $4, $5, $6)
    RETURNING *;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows[0])
    .catch(err => console.log('Error:', err.message));
};
exports.newPoint = newPoint;


const deletePoint = function(point) {
  const values = [point];
  const strQuery = `
      DELETE FROM points
      WHERE id = $1
      RETURNING *;`;
  return db
    .query(strQuery, values)
    .then(result => result.rows[0])
    .catch(err => console.log('Error:', err.message));
};
exports.deletePoint = deletePoint;
