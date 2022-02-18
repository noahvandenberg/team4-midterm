const res = require('express/lib/response');
const db = require('../../lib/db');
const chalk = require('chalk');



// BROWSE
const allPoints = async() => {
  try {
    const query = {
      text: 'SELECT * FROM points;',
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ allpoints:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.allPoints = allPoints;

const findPointsByUser = async(userId) => {
  try {
    const query = {
      text: 'SELECT * FROM points WHERE creator_id = $1;',
      values: [userId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ findPointsByUser:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.findPointsByUser = findPointsByUser;

const findPointsByMap = async(mapId) => {
  try {
    const query = {
      text: 'SELECT * FROM points WHERE map_id = $1;',
      values: [mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ findPointsByMap:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.findPointsByUser = findPointsByUser;


// READ
const findPointById = async(mapId) => {
  try {
    const query = {
      text: 'SELECT * FROM points WHERE id = $1;',
      values: [mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ findPointsById:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.findPointById = findPointById;



// EDIT
const updatePointTitle = async(mapId, title) => {
  try {
    const query = {
      text: 'UPDATE maps SET title = $1 WHERE id = $2 RETURNING *;',
      values: [title, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ updateMapTitle:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.updatePointTitle = updatePointTitle;

const updatePointDescription = async(mapId, description) => {
  try {
    const query = {
      text: 'UPDATE points SET description = $1 WHERE id = $2 RETURNING *;',
      values: [description, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ updateMapDescription:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.updatePointDescription = updatePointDescription;

const updatePointImageURL = async(mapId, imageUrl) => {
  try {
    const query = {
      text: 'UPDATE points SET image_url = $1 WHERE id = $2 RETURNING *;',
      values: [imageUrl, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ updateMapImageURL:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.updatePointImageURL = updatePointImageURL;

const updatePointLocation = async(mapId, latitude, longitude) => {
  try {
    const query = {
      text: 'UPDATE points SET latitude = $1, longitude = $2 WHERE id = $3 RETURNING *;',
      values: [latitude, longitude, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ updateMapLocation:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.updatePointLocation = updatePointLocation;



// ADD
const createPoint = async(userId, mapId, title, description, latitude, longitude) => {
  try {
    const query = {
      text: 'INSERT INTO points (creator_id, map_id, title, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      values: [userId, mapId, title, description, latitude, longitude],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ createMap:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.createPoint = createPoint;



// DELETE
const deletePoint = async(pointId) => {
  try {
    const query = {
      text: 'DELETE FROM points WHERE id = $1 RETURNING *;',
      values: [pointId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ deletePoint:', chalk.whiteBright(error)));
    return res.status(500);
  }
};
exports.deletePoint = deletePoint;
