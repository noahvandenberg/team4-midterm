const {} = require('../db/queries/map_queries')
const {} = require('../db/queries/map_queries')
const {} = require('../db/queries/map_queries')

module.exports = (router, db) => {

  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {
    res.render("../views/login");
  });

  router.get("/maps", async (req,res) => {

    // Should Be In Query File and
    const result = () => {
      return db.query(`
      SELECT latitude, longitude
      FROM points
      GROUP BY id;`)
    };

    const dbResponse = await result();
    const dbRows = dbResponse.rows;

    const templateVars = {
      locations: dbRows,
    };

    res.render("../views/maprender.ejs", templateVars);

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
