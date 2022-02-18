const { allPoints, findPointById, findPointsByMap } = require('../db/queries/point-queries')
const { allUsers, findUserById } = require('../db/queries/user-queries')
const { allMaps, findMapById, findMapsByUser, findFavouriteMapsByUser} = require('../db/queries/map-queries')
const { randomSelection, isLoggedIn } = require('../helpers/helpers')


module.exports = (router, db) => {

  // Serve The Landing Page
  router.get("/", async(req, res) => {
    const templateVars = {
      maps: randomSelection(await allMaps(), 12),
      isLoggedIn: isLoggedIn(false),
    }
    res.render("../views/index", templateVars);
  });

  // Server The General Map Page
  router.get("/map", async (req,res) => {
    const templateVars = {
      isLoggedIn: isLoggedIn(true),
      // Should Be parsed cookie
      userObj: await findUserById(11),
      selectedMap: false,
      sideMenuItems: await findMapsByUser(11)
    }
    res.render("../views/map", templateVars);
  });

  // Serve A Specific Map Page
  router.get("/map/:map_id", async (req,res) => {
    if (req.params.map_id === 'map' || req.params.map_id === 'm' || !req.params.map_id) {
      res.redirect('/map')
    }
    const templateVars = {
      isLoggedIn: isLoggedIn(true),
      // Should Be parsed cookie
      userObj: await findUserById(11),
      selectedMap: await findMapById(req.params.map_id),
      sideMenuItems: await findPointsByMap(req.params.map_id)
    }
    res.render("../views/map", templateVars);
  });

  // Serve A Specific Profile Page
  router.get("/profile", async (req,res) => {
    const templateVars = {
      isLoggedIn: isLoggedIn(true),
      // Should Be parsed cookie
      userObj: await findUserById(11),
      selectedMap: false,
      maps: await findMapsByUser(11),
      favourites: await findFavouriteMapsByUser(11)
    }
    console.log(templateVars)
    res.render("../views/profile", templateVars);
  });


  // Login A User
  router.post("/login", (req,res) => {

  });

  // Logout A Users
  router.post("/logout", (req,res) => {

  });



}
