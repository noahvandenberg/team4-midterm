const { allPoints, findPointById, findPointsByUser, updatePointTitle, updatePointDescription, updatePointImageURL, updatePointLocation, createPoint, deletePoint } = require('../db/queries/point-queries');
const chalk = require('chalk');
const e = require('express');

module.exports = (router) => {

  // BROWSE
  router.get('/', async (req, res) => {
    try {
      const dbResponse = await allPoints();
      res.json(dbResponse)
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ GET \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });

  router.get('/u/:id', async (req, res) => {
    try {
      const dbResponse = await findPointsByUser(req.params.id);
      if (dbResponse.length > 0) {
        res.json(dbResponse)
      } else {
        res.json(dbResponse)
        throw 'User Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ GET \'/u/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // READ
  router.get('/:id', async (req, res) => {
    try {
      const dbResponse = await findPointById(req.params.id);
      if (dbResponse.length > 0) {
        res.json(dbResponse)
      } else {
        res.json(dbResponse)
        throw 'Point Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ GET \'/i/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // // EDIT
  router.put('/:id', async (req, res) => {
    try {
      const dbResponse = await findPointById(req.params.id);
      // console.log(req.body)
      if (dbResponse.length > 0) {
        let updateResponse = dbResponse;
        if (req.body.title) {
          updateResponse = await updatePointTitle(req.params.id, req.body.title);
        }
        if (req.body.description) {
          updateResponse = await updatePointDescription(req.params.id, req.body.description);
        }
        if (req.body.title) {
          updateResponse = await updatePointImageURL(req.params.id, req.body.imageURL);
        }
        if (req.body.description) {
          updateResponse = await updatePointLocation(req.params.id, req.body.latitude, req.body.longitude);
        }
        res.json(updateResponse);
      } else {
        res.json(dbResponse);
        throw 'Point Does Not Exist'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ PUT \'/:id\':', chalk.whiteBright(error)));
      return res.status(500);
    }
  });



  // ADD
  router.post('/', async (req, res) => {
    try {
      if (req.body.creator_id && req.body.title && req.body.description) {
        const dbResponse = await createPoint(req.body.creator_id, req.body.title, req.body.description, req.body.latitude, req.body.longitude);
        res.json(dbResponse);
      } else {
        res.json();
        throw 'Missing Required Parameter'
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ POST \'/\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const dbResponse = await findPointById(req.params.id);
      if (dbResponse.length > 0) {
        const deleteResponse = await deletePoint(req.params.id);
        res.json(deleteResponse);
      } else {
        res.json(dbResponse);
        throw 'Map Does Not Exist';
      }
    } catch (error) {
      console.log(chalk.redBright('ERROR in points.js @ DELETE \'/:id\':', chalk.whiteBright(error)))
      return res.status(500);
    }
  });



  return router;
};
