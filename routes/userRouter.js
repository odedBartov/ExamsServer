var express = require('express');
var router = express.Router();

var mainDB = require('../DAL/dbRepository')

router.post('/temp', function (req, res, next) {
//  res.json({ success: "great success" });

  mainDB.executeInDB(data => res.json(data))
});

router.post("/addQuestion", function(req, res) {
    mainDB.addQuestion(req.body,(data)=>{res.json(data)})
   // mainDB.addQuestion(req.body).Subscribe(() => {res.end("questions created")});

  //res.end("hello hello");
});


module.exports = router;
