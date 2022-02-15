const { allMaps, findUserMaps, addUserMap, deleteUserMap } = require('../../db/queries/map-queries');

module.exports = (router, db) => {

  /************ Get a list of all maps irrespective of user ***********/
  router.get("/", (req, res) => {
    allMaps()
      .then(maps => {
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  /************* Get a list of a logged in users maps ******************/
  router.get('/:id', (req, res) => {
    findUserMaps(req.params.id)
      .then(maps => {
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /************************** Add a map *******************************/
  router.post('/', (req, res) => {
    addUserMap(req.body.creator_id)
      .then(map => {
        res.json({ map });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /**************************Delete a map ****************************8*/
  router.delete('/:id', (req, res) => {
    deleteUserMap(req.body.id)
      .then(data => console.log(data))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
