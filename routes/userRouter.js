var express = require("express");
var router = express.Router();

var mainDB = require("../DAL/dbRepository");

router.post("/temp", function(req, res, next) {
  //  res.json({ success: "great success" });
  mainDB.executeInDB(data => res.json(data));
});

router.post("/login", function(req, res) {
  mainDB.login(req.body, data => {
    res.json(data);
  })
})

module.exports = router;
