const { allPoints, mapPoints, findPoint, editPoint, newPoint, deletePoint } = require('../../db/queries/point-queries');

module.exports = (router, db) => {

  /********************** Browse a list of all points ***********************/
  router.get("/", (req, res) => {
    allPoints()
      .then(points => {
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
    mapPoints(req.params.id)
      .then(points => {
        res.json({ points });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************************** Edit a point ************************************/
  router.put('/:id', (req, res) => {
    findPoint('id', req.body.id)
      .then(user => editPoint(user, req.body))
      .catch(err => {
        res
          .status(500)
          .json({error: err.message });
      });
  });

  /************************ Add a point to a map ******************************/
  router.post('/', (req, res) => {
    newPoint(req.body)
      .then(point => {
        res.json({ point });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************************ Delete a point ************************************/
  router.delete('/:id', (req, res) => {
    deletePoint(req.body.id)
      .then(data => console.log(data))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
