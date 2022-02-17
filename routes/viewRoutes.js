const { allPoints, mapPointsByUser, mapPoints, findPoint } = require('../db/queries/point-queries')
const { allUsers, findUser } = require('../db/queries/user-queries')
const { allMaps, findUserMaps} = require('../db/queries/map-queries')


module.exports = (router, db) => {

  // Serve The Landing Page
  router.get("/", async(req, res) => {
    const templateVars = {
      maps: await allMaps(),
    }
    res.render("../views/index", templateVars);
  });

  // Serve The Login Page
  router.get("/login", (req,res) => {

  });

  // Server The General Map Page
  router.get("/maps", async (req,res) => {

  });

  // Serve A Specific Map Page
  router.get("/maps:map_id", (req,res) => {

  });

  // Login A User
  router.post("/login", (req,res) => {

  });

  // Logout A Users
  router.post("/logout", (req,res) => {

  });

}
