const { findUserById, deleteUser, allUsers, createUser, updateUserEmail, updateUserFirstName, updateUserPassword } = require('../../db/queries/user-queries');
const chalk = require('chalk');

module.exports = (router) => {

  // BROWSE
  router.get('/', async (req, res) => {
    try {
      const dbResponse = await allUsers();
      res.json(dbResponse)
    } catch (error) {
      console.log(chalk.redBright('ERROR in user.js @ GET \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // READ
  router.get('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.params.id);
      res.json(dbResponse)
    } catch (error) {
      console.log(chalk.redBright('ERROR in user.js @ GET \'/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // EDIT
  router.put('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.body.id);
      if (req.body.email) {
        updateUserEmail(req.body.id, req.body.email);
      }
      if (req.body.firstName) {
        updateUserFirstName(req.body.id, req.body.firstName);
      }
      if (req.body.lastName) {
        updateUserLastName(req.body.id, req.body.lastName);
      }
      if (req.body.password) {
        updateUserPassword(req.body.id, req.body.password);
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in user.js @ GET \'/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // ADD
  router.post('/', async (req, res) => {
    try {
      const dbResponse = await findUserByEmail(req.body.email);
      if (!dbResponse) {
        createUser(req.body);
      } else {
        throw 'User Already Exists';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in user.js @ POST \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const dbResponse = await findUserById(req.params.id);
      if (!dbResponse) {
        deleteUser(req.params.id);
      } else {
        throw 'User Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in user.js @ DELETE \'/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  return router;
};
