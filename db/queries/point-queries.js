const db = require('../db');



// BROWSE
const allPoints = async () => {
  try {
    const query = {
      test: 'SELECT * FROM points;',
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ allpoints:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.allPoints = allPoints;



// READ
const findPointsByUser = async (userId) => {
  try {
    const query = {
      test: 'SELECT * FROM points WHERE creator_id = $1;',
      values: [userId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ findPointsByUser:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findPointsByUser = findPointsByUser;

const findMapsById = async (mapId) => {
  try {
    const query = {
      test: 'SELECT * FROM points WHERE id = $1;',
      values: [mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in point-queries.js @ findPointsById:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findMapsById = findMapsById;



// EDIT
const updatePointTitle = async (mapId, title) => {
  try {
    const query = {
      test: 'UPDATE maps SET title = $1 WHERE id = $2;',
      values: [title, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapTitle:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updatePointTitle = updatePointTitle

const updatePointDescription = async (mapId, description) => {
  try {
    const query = {
      test: 'UPDATE points SET description = $1 WHERE id = $2;',
      values: [description, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapDescription:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updatePointDescription = updatePointDescription

const updatePointImageURL = async (mapId, image_url) => {
  try {
    const query = {
      test: 'UPDATE points SET image_url = $1 WHERE id = $2;',
      values: [image_url, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapImageURL:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updatePointImageURL = updatePointImageURL

const updatePointLocation = async (mapId, latitude, longitude) => {
  try {
    const query = {
      test: 'UPDATE points SET latitude = $1, longitude = $2 WHERE id = $3;',
      values: [latitude, longitude, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapLocation:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updatePointLocation = updatePointLocation



// ADD
const createPoint = async (userId, title, description, latitude, longitude) => {
  try {
    const query = {
      test: 'INSERT INTO point (creator_id, title, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      values: [userId, title, description, latitude, longitude],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ createMap:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.createPoint = createPoint;



// DELETE
const deletePoint = async (pointId) => {
  try {
    const query = {
      test: 'DELETE FROM points WHERE id = $1;',
      values: [pointId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ deletePoint:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.deletePoint = deletePoint;
