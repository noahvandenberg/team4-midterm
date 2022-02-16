const { allPoints, mapPointsByUser, mapPoints, findPoint } = require('../db/queries/point-queries')
const { allUsers, findUser } = require('../db/queries/user-queries')
const { allMaps, findUserMaps} = require('../db/queries/map-queries')


module.exports = (router, db) => {


  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {


  });

  router.get("/maps", async (req,res) => {

  });

  router.get("/maps:map_id", (req,res) => {

  });

}
