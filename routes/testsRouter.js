var express = require('express');
var router = express.Router();

var mainDB = require('../DAL/dbRepository');

//add test
router.post("/addTest", function(req, res) {
    mainDB.addTest(req.body,(data)=>{res.json(data)})
});

//get test by id
router.get("/getTestById/:testId",function(req,res){
  //console.log(req.params['testId']);
  mainDB.getTestById(req.params['testId'],(data)=>{res.json(data)})
//res.send(req.params);
});
//get test by link

//delete test

//add questions to test

module.exports = router;
