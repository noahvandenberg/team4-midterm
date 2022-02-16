const { findUserById, addUser, deleteUser, allUsers, editUser } = require('../../db/queries/user-queries');

module.exports = (router, db) => {

  /*********************** Browse all of the users **********************/
  router.get("/", async (req, res) => {
    const dbResponse = await allUsers();
    res.json(dbResponse)
  });

  /***************** Read the details of a specific user *****************/
  router.get("/:id", async (req, res) => {
    const dbResponse = await findUserById(req.params.id);
    res.json(dbResponse)
  });

  /*************************** Edit a user *****************************/
  router.put('/:id', (req, res) => {
    findUserById(req.body.id)
      .then(user => editUser(user, req.body))
      .catch(err => {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  /************************** Login a user *****************************/
  router.post('/login', (req, res) => {
    console.log(req.body);
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
