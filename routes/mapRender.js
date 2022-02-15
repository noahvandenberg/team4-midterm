const express = require('express');
const router = express.Router();

module.exports = () => {

  router.get("/", (req, res) => {
    console.log("In the user maps route.");
    res.render('map')
  });

  return router;
};
