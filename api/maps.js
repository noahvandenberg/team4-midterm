const { allMaps, findMapsByUser, findMapById, updateMapTitle, updateMapDescription, createMap, deleteMap, updateMapImageUrl } = require('../db/queries/map-queries');
const chalk = require('chalk');

module.exports = (router) => {

  // BROWSE
  router.get('/', async (req, res) => {
    try {
      const dbResponse = await allMaps();
      res.json(dbResponse);
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ GET \'/\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });

  router.get('/u/:id', async (req, res) => {
    try {
      const dbResponse = await findMapsByUser(req.params.id);
      if (dbResponse.length > 0) {
        res.json(dbResponse);
      } else {
        res.json(dbResponse);
        throw 'User Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ GET \'/u/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // READ
  router.get('/:id', async (req, res) => {
    try {
      const dbResponse = await findMapById(req.params.id);
      if (dbResponse.length > 0) {
        res.json(dbResponse);
      } else {
        res.json(dbResponse);
        throw 'Map Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ GET \'/i/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // // EDIT
  router.put('/:id', async (req, res) => {
    try {
      const dbResponse = await findMapById(req.params.id);
      // console.log(req.body)
      if (dbResponse.length > 0) {
        let updateResponse = dbResponse;
        if (req.body.title) {
          updateResponse = await updateMapTitle(req.params.id, req.body.title);
        }
        if (req.body.description) {
          updateResponse = await updateMapDescription(req.params.id, req.body.description);
        }
        if (req.body.imageURL) {
          updateResponse = await updateMapImageUrl(req.params.id, req.body.imageURL);
        }
        res.json(updateResponse);
      } else {
        res.json(dbResponse);
        throw 'Map Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ PUT \'/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // ADD
  router.post('/', async (req, res) => {
    try {
      if (req.body.creator_id && req.body.title && req.body.description) {
        const dbResponse = await createMap(req.body.creator_id, req.body.title, req.body.description, req.body.imageURL);
        res.json(dbResponse);
      } else {
        res.json();
        throw 'Missing Required Parameter';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ POST \'/\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const dbResponse = await findMapById(req.params.id);
      if (dbResponse.length > 0) {
        const deleteResponse = await deleteMap(req.params.id);
        res.json(deleteResponse);
      } else {
        res.json(dbResponse);
        throw 'Map Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in maps.js @ DELETE \'/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  return router;
};
