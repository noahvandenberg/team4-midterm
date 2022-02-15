/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { allMaps, findUserMaps, addUserMap, deleteUserMap } = require('../db/map-queries.js');

module.exports = (db) => {

  /************ Get a list of all maps irrespective of user ***********/
  router.get("/", (req, res) => {
    allMaps()
      .then(maps => {
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  /************* Get a list of a logged in users maps ******************/
  router.get('/:id', (req, res) => {
    findUserMaps(req.params.id)
      .then(maps => {
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /********************* Edit a user's map ****************************/


  /************************** Add a map *******************************/
  router.post('/', (req, res) => {
    addUserMap(req.body.creator_id)
      .then(map => {
        res.json({ map });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /**************************Delete a map ****************************8*/
  router.delete('/:id', (req, res) => {
    deleteUserMap(req.body.id)
      .then(data => console.log(data))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
