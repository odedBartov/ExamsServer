var express = require('express');
var router = express.Router();

var mailService=require('../Services/mailService');
var mainDB = require('../DAL/dbRepository');

//add test
router.post("/addTest", function(req, res) {
    mainDB.addTest(req.body,(data)=>{res.json(data)})
});

router.post("/getQuestions", function(req, res) {
    console.log(req.body);
    mainDB.getQuestions(req.body, (data) => {res.json(data)})
})

//get test by id    example: http:/localhost:4040/testsapi/getTestById/7
router.get("/getTestById/:testId",function(req,res){
  //console.log(req.params['testId']);
  mainDB.getTestById(req.params['testId'],(data)=>{res.json(data)})
//res.send(req.params);
});

//get test by link  example: http:/localhost:4040/testsapi/getTestByLink?testLink=lala/lala
router.get("/getTestByLink",function(req,res){
 //mailService.init();
 //odedoded777@gmail.com
  mailService.sendActivateMail("odedoded777@gmail.com");
 // console.log(req.query.testLink);
  mainDB.getTestByLink(req.query.testLink,(data)=>{res.json(data)})
//res.send(req.params);
});

//delete test

//add questions to test

//send mail 
function sendMail(source, target, content){

};

module.exports = router;
