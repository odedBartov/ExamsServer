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
router.get("/getQuestionsForTest/:testID", function(req, res) {
  mainDB.getQuestionsForTest(req.params['testID'], data => {
    res.json(data);
  })
})
router.get("/getTestsForField/:fieldID", function(req, res) {
  mainDB.getTestsForField(req.params['fieldID'], data => {
    res.json(data);
  })
})
router.post("/submitTest", function(req, res) {
  mainDB.submitTest(req.body, data => {
    res.json(data);
  })
})
router.post("/getAnsweredTestsInRange", function(req, res) {
  mainDB.getTestsInRange(req.body, data => {
    res.json(data);
  })
})
router.post("/getAllAnsweredTest", function(req, res) {
  mainDB.getAllAnsweredTest(req.body.testID, data => {
    res.json(data);
  })
})



//get test by id    example: http:/localhost:4040/testsapi/getTestById/7
router.get("/getTestById/:testId", function(req, res) {
  mainDB.getTestById(req.params['testId'],(data)=>{res.json(data)});
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
  mainDB.getAllFields((data)=>{res.json(data)});
//res.send(req.params);
});

//activate test
router.post("/activateTest", function(req, res) {
  console.log(req.body);
  mainDB.activateTest(req.body, (data) => {res.json(data)})
})

//get tests by fieldID
router.get("/getTestsByFieldId/:fieldId",function(req,res){
  mainDB.getTestsByFieldId(req.params['fieldId'],(data)=>{res.json(data)});
//res.send(req.params);
});

//get questions for selection table
router.get("/getQuestionsByFieldId/:fieldId",function(req,res){
  mainDB.getQuestionByFieldId(req.params['fieldId'],(data)=>{res.json(data)});
});

router.get("/getQuestionById/:questionId",function(req,res){
  mainDB.getQuestionById(req.params['questionId'],(data)=>{res.json(data)});
});

router.post("/addUser",function(req, res) {
  mainDB.addUser(req.body, (data) => {res.json(data)})
})

router.get("/getAnswersByQuestionId/:questionId",function(req,res){
  mainDB.getAnswersByQuestionId(req.params['questionId'],(data)=>{res.json(data)});
});

router.post('/addQuestionsForTest',function(req, res) {
  testId=req.body.pop();
  list=req.body;
  mainDB.addQuestionsForTest(testId,list, (data) => {res.json(data)})
})

router.get('/getQuestionByTestId/:testId',function (req,res){
  mainDB.getQuestionByTestId(req.params['testId'],(data)=>{res.json(data)});
})

router.post("/addExam",function (req,res){
  console.log("in rouetr.addExam");
  console.log(req.body);
  console.log(req.body['test']);
  console.log(req.body['answersArr']);
  console.log(req.body['user']);
  console.log("in rouetr.addExam");
  let test=req.body['test'];
  let answersArr=req.body['answersArr'];
  let user=req.body['user'];
  console.log(answersArr);
  let answersID=[];
  //answersArr.array.forEach(a => {answersID.push(a.ID) });
  for (let i = 0; i < answersArr.length; i++) {
    answersID.push(answersArr[i].ID)
  }

  //get user id by email
  mainDB.getUserIdByMail(user.email,(data)=>{
    console.log(data);
    console.log(data["ID"]);
    user.id=data["ID"]
  
  // add to answeredTest  //change the table to not null
  //TODO:: calculate the grade
  //TODO:: calculate the current question status
  //TODO:: calculate the is finished
  let answeredTestID;
  //mainDB.addToAnsweredTest(user.id,test.ID,70,1,true,(data)=>{answeredTestID=data});
  mainDB.submitTest(user.id,test.ID,70,1,true,answersID,(data)=>{
    console.log(data)
    answeredTestID=data
  });

});
  //add answeres to table Answers-Questions


});

//delete test

//add questions to test

//send mail 

//send mail
function sendMail(source, target, content) {}

module.exports = router;
