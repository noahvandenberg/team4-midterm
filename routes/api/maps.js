/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  /************ Get a list of all maps irrespective of user ***********/
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************* Get a list of a users maps ***************************/
  router.get('/:id', (req, res) => {
    let query = 'SELECT * FROM maps WHERE creator_id = $1;';
    db.query(query, [req.params.id])
      .then(data => {
        const map = data.rows[0];
        res.json({ map });
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
    let query = 'INSERT INTO maps (creator_id, time_created) VALUES ($1, $2) RETURNING *;';
    const values = [req.body.creator_id, Date.now()];
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

  /**************************Delete a map ****************************8*/
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM maps where id = $1 RETURNING *;', [req.body.id])
      .then(data => console.log(data))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  
  return router;
};
