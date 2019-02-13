var express = require('express');
var router = express.Router();


var mainDB = require('../DAL/dbRepository')

router.get('/temp', function (req, res, next) {
//  res.json({ success: "great success" });

  mainDB.executeInDB(data => res.json(data))
});

router.post("/addTest", function(req, res) {
    mainDB.addTest(req.body,(data)=>{res.json(data)})
});


module.exports = router;
