/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  /*********************** Browse all of the users **********************/
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /***************** Read the details of a specific user *****************/
  router.get("/:id", (req, res) => {
    db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
      .then(data => {
        const user = data.rows[0];
        res.json({ user });
      })
      .catch(err => {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  /*************************** Edit a user *****************************/
  router.put('/:id', (req, res) => {
    let query = 'UPDATE users SET ';
    let values = Object.values(req.body);
    switch (values.shift()) {
    case 'email':
      query += 'email';
      break;
    case 'first_name':
      query += 'first_name';
      break;
    case 'last_name':
      query += 'last_name';
      break;
    }
    query += ` = $1 WHERE id = $2 RETURNING *;`;
    console.log(values);
    console.log(query);
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

  /****************************** Add a user ******************************/
  router.post('/', (req, res) => {
    let query = 'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3);';
    const values = Object.values(req.body);
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

  /*************************** Delete a user ***************************/
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM users where id = $1 RETURNING (first_name);', [req.body.id])
      .then(data => console.log(data));
  });

  return router;
};
