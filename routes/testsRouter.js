var express = require('express');
var router = express.Router();

var mainDB = require('../DAL/dbRepository');

router.post("/addTest", function(req, res) {
    mainDB.addTest(req.body,(data)=>{res.json(data)})
});

router.post("/getQuestions", function(req, res) {
    console.log(req.body);
    mainDB.getQuestions(req.body.id, (data) => {
        console.log(data);
        res.json(data)})
})


module.exports = router;
