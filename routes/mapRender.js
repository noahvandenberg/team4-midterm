const express = require('express');
const router = express.Router();

module.exports = () => {

  router.get("/", (req, res) => {
    console.log("In the user maps route.");
    req.session.userId = 1;
    console.log("cookie userId:", req.session.userId);
    res.render('map')
  });

  return router;
};
