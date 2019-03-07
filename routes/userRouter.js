var express = require("express");
var router = express.Router();

var mainDB = require("../DAL/dbRepository");

router.post("/temp", function(req, res, next) {
  //  res.json({ success: "great success" });
  mainDB.executeInDB(data => res.json(data));
});
router.post("/addQuestion", function(req, res) {
  mainDB.addQuestion(req.body, data => {
    res.json(data);
  });
  
  // mainDB.addQuestion(req.body).Subscribe(() => {res.end("questions created")});
  //res.end("hello hello");
});
router.post("/login", function(req, res) {
  mainDB.login(req.body, data => {
    res.json(data);
  })
})
router.get("/getAllStudents", function(req, res) {
  mainDB.getAllStudents(data => {
    res.json(data);
  })
})
router.get("/getTestsForStudent/:studentID", function(req, res) {
  mainDB.getTestForStudent(req.params['studentID'], data => {
    res.json(data);
  })
})
router.post("/getQuestionsAndAnsweresForAnsweredTest", function(req, res) {
  mainDB.getQuestionsAndAnsweresForAnsweredTest(req.body, data => {
    res.json(data);
  })
})

module.exports = router;
