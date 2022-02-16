const { findUserById, findUserByEmail, deleteUser, allUsers, createUser, updateUserEmail, updateUserFirstName, updateUserLastName, updateUserPassword } = require('../db/queries/user-queries');
const chalk = require('chalk');
const e = require('express');

module.exports = (router) => {

  // BROWSE
  router.get('/', async (req, res) => {
    try {
      const dbResponse = await allUsers();
      res.json(dbResponse)
    } catch (error) {
      console.log(chalk.redBright('ERROR in users.js @ GET \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // READ
  router.get('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.params.id);
      if (dbResponse.length > 0) {
        res.json(dbResponse)
      } else {
        res.json(dbResponse)
        throw 'User Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in users.js @ GET \'/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // EDIT
  router.put('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.params.id);
      // console.log(req.body)
      if (dbResponse.length > 0) {
        let updateResponse = dbResponse;
        if (req.body.email) {
          updateResponse = await updateUserEmail(req.params.id, req.body.email);
        }
        if (req.body.firstName) {
          updateResponse = await updateUserFirstName(req.params.id, req.body.firstName);
        }
        if (req.body.lastName) {
          updateResponse = await updateUserLastName(req.params.id, req.body.lastName);
        }
        if (req.body.password) {
          updateResponse = await updateUserPassword(req.params.id, req.body.password);
        }
        res.json(updateResponse);
      } else {
        res.json(dbResponse);
        throw 'User Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in users.js @ GET \'/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // ADD
  router.post('/', async (req, res) => {
    try {
      const dbResponse = await findUserByEmail(req.body.email);
      if (dbResponse.length === 0) {
        const createResponse = await createUser(req.body);
        res.json(createResponse);
      } else {
        res.json();
        throw 'User Already Exists';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in users.js @ POST \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.params.id);
      if (dbResponse.length > 0) {
        const deleteResponse = await deleteUser(req.params.id);
        res.json(deleteResponse);
      } else {
        res.json(dbResponse);
        throw 'User Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in users.js @ DELETE \'/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  return router;
};
