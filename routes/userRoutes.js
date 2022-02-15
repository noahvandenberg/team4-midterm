const { allPoints, mapPointsByUser, mapPoints, findPoint } = require('../db/queries/point-queries')
const { allUsers, findUser } = require('../db/queries/user-queries')
const { allMaps, findUserMaps} = require('../db/queries/map-queries')


module.exports = (router, db) => {

  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {
    res.render("../views/login");
  });

  router.get("/maps", async (req,res) => {

    const dbResponse = await allPoints();

    const templateVars = {
      locations: dbResponse,
    };

    res.render("../views/maprender", templateVars);

  });

  router.get("/maps:map_id", (req,res) => {
    const templateVars = {

    };
    res.render("../views/map", templateVars);
  });

  router.get("/profile", (req,res) => {
    res.render("../views/profile");
  });

}
