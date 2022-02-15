

module.exports = (router, db) => {

  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {
    res.render("../views/login");
  });

  router.get("/maps", async (req,res) => {

    // Should Be In Query File and Imported
    const result = () => {
      return db.query(`
      SELECT latitude, longitude
      FROM points
      GROUP BY id;`)
    };

    let dbResponse = await result();

    const templateVars = {
      locations: dbResponse.rows,
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
