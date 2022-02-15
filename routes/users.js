/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { findUser, addUser, deleteUser, allUsers, editUser } = require('../db/user-queries.js');

module.exports = (db) => {

  /*********************** Browse all of the users **********************/
  router.get("/", (req, res) => {
    allUsers()
      .then(users => {
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
    findUser('id', req.params.id)
      .then(data => {
        const user = data;
        res.json({ user });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /*************************** Edit a user *****************************/
  router.put('/:id', (req, res) => {
    findUser('id', req.body.id)
      .then(user => editUser(user, req.body))
      .catch(err => {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  /************************** Login a user *****************************/
  router.post('/login', (req, res) => {
    console.log('logging in', req.body);
    findUser('email', req.body.email)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        console.log(req.session.userId);
      })
      .catch(err => res.send(err));
  });

  /**************************** Logout a user **************************/
  router.post('/logout', (req) => {
    req.session.userId = null;
  });

  /****************************** Add a user ******************************/
  router.post('/', (req, res) => {
    findUser('email',req.body.email)
      .then((user) => {
        console.log(user);
        if (!user) addUser(req.body);
        else console.log('User already exists');
      })
      .catch((err) => {
        res
          .status(500)
          .json({error: err.message});
      });
  });

  /*************************** Delete a user ***************************/
  router.delete('/:param', (req, res) => {
    findUser(req.body.search, req.body.search_value)
      .then(user => deleteUser(user))
      .catch(err => {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  return router;
};
