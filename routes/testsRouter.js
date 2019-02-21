var express = require("express");
var router = express.Router();

var mailService = require("../Services/mailService");
var mainDB = require("../DAL/dbRepository");

//add test
router.post("/addTest", function(req, res) {
  mainDB.addTest(req.body, data => {
    res.json(data);
  });
});

router.post("/addQuestion", function(req, res) {
  mainDB.addQuestion(req.body, data => {
    res.json(data);
  });
});
router.post("/updateQuestion", function(req, res) {
  mainDB.updateQuestion(req.body, data => {
    res.json(data);
  });
});
router.post("/getAnswers", function(req, res) {
  mainDB.getAnswers(req.body.id, data => {
    res.json(data);
  });
});
router.post("/getQuestions", function(req, res) {
  mainDB.getQuestions(req.body.id, data => {
    res.json(data);
  });
});

//get test by id    example: http:/localhost:4040/testsapi/getTestById/7
router.get("/getTestById/:testId", function(req, res) {
  //console.log(req.params['testId']);
  mainDB.getTestById(req.params['testId'],(data)=>{res.json(data)});
//res.send(req.params);
});

//get test by link  example: http:/localhost:4040/testsapi/getTestByLink?testLink=lala/lala
router.get("/getTestByLink",function(req,res){
 //mailService.init();
 //odedoded777@gmail.com
  //mailService.sendActivateMail("odedoded777@gmail.com");
 // console.log(req.query.testLink);
  mainDB.getTestByLink(req.query.testLink,(data)=>{res.json(data)});
//res.send(req.params);
});

//getAllfields
router.get("/getAllFields",function(req,res){
  //console.log(req.params['testId']);
  mainDB.getAllFields((data)=>{res.json(data)});
//res.send(req.params);
});

//activate test
router.post("/activateTest", function(req, res) {
  console.log(req.body);
  mainDB.activateTest(req.body, (data) => {res.json(data)})
})

//get test by fieldID
router.get("/getTestByFieldId/:fieldId",function(req,res){
  //console.log(req.params['testId']);
  mainDB.getTestByFieldId(req.params['fieldId'],(data)=>{res.json(data)});
//res.send(req.params);
});
//delete test

//add questions to test

//send mail
function sendMail(source, target, content) {}

module.exports = router;
