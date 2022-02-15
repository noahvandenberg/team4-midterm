

module.exports = (router, db) => {

  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {
    res.render("../views/login");
  });

  router.get("/maps", (req,res) => {
    const getUserCount = function() {
      return db
        .query(`
        SELECT latitude, longitude
        FROM points
        GROUP BY id;`)
        .then((result) => {
          console.log(result.rows)

          const templateVars = {
            locations: result.rows,
          }

          res.render("../views/maprender.ejs", templateVars);

        })
        .catch((err) => {
          console.log(err.message);
      });
    }
    getUserCount();
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
