/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  /********************** Browse a list of all points ***********************/
  router.get("/", (req, res) => {
    let query = `SELECT * FROM points`;
    console.log(query);
    db.query(query)
      .then(data => {
        const points = data.rows;
        res.json({ points });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /********************* Get a list of points for a map ***********************/
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM points WHERE id = $1;`;
    db.query(query, [req.params.id])
      .then(data => {
        const points = data.rows;
        res.json({ points });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************************** Edit a point ************************************/


  /************************ Add a point to a map ******************************/
  router.post('/', (req, res) => {
    let query = 'INSERT INTO points (creator_id, title, destination, image_url, latitude, longitude, time_created) VALUES ($1, $2) RETURNING *;';
    const values = [...req.body, Date.now()];
    db.query(query, values)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************************ Delete a point ************************************/
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM points WHERE id = $1 RETURNING *;', [req.body.id])
      .then(data => console.log(data))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
