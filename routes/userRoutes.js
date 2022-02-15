

module.exports = (router, db) => {

  router.get("/", (req, res) => {
    res.render("../views/index");
  });

  router.get("/login", (req,res) => {
    res.render("../views/login");
  });

  router.get("/maps", (req,res) => {
    const templateVars = {

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
