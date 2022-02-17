const res = require('express/lib/response');
const db = require('../../lib/db');
const chalk = require('chalk')



// BROWSE
const allMaps = async () => {
  try {
    const query = {
      text: 'SELECT * FROM maps;',
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ allmaps:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.allMaps = allMaps;



// READ
const findMapsByUser = async (userId) => {
  try {
    const query = {
      text: 'SELECT * FROM maps WHERE creator_id = $1;',
      values: [userId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ findMapsByUser:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findMapsByUser = findMapsByUser;

const findMapById = async (mapId) => {
  try {
    const query = {
      text: 'SELECT * FROM maps WHERE id = $1;',
      values: [mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ findMapsById:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.findMapById = findMapById;



// EDIT
const updateMapTitle = async (mapId, title) => {
  try {
    const query = {
      text: 'UPDATE maps SET title = $1 WHERE id = $2 RETURNING *;',
      values: [title, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapTitle:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updateMapTitle = updateMapTitle

const updateMapDescription = async (mapId, description) => {
  try {
    const query = {
      text: 'UPDATE maps SET description = $1 WHERE id = $2 RETURNING *;',
      values: [description, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapDescription:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updateMapDescription = updateMapDescription

const updateMapImageUrl = async (mapId, imageURL) => {
  try {
    const query = {
      text: 'UPDATE maps SET image_url = $1 WHERE id = $2 RETURNING *;',
      values: [imageURL, mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ updateMapDescription:', chalk.whiteBright(error)))
    return res.status(500);
  }
}
exports.updateMapImageUrl = updateMapImageUrl



// ADD
const createMap = async (userId,title,description, imageURL) => {
  try {
    const query = {
      text: 'INSERT INTO maps (creator_id, title, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
      values: [userId, title, description, imageURL],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ createMap:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.createMap = createMap;



// DELETE
const deleteMap = async (mapId) => {
  try {
    const query = {
      text: 'DELETE FROM maps WHERE id = $1 RETURNING *;',
      values: [mapId],
    };
    const dbResponse = await db.query(query);
    return dbResponse.rows;
  } catch (error) {
    console.log(chalk.redBright('ERROR in map-queries.js @ deleteMap:', chalk.whiteBright(error)))
    return res.status(500);
  }
};
exports.deleteMap = deleteMap;
