var express = require("express");
var app = express();
var userRouter = require('./routes/userRouter');
var testsRouter=require('./routes/testsRouter');

const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    });
    
    //routes:
    app.use('/userapi', userRouter);
    app.use('/testsapi', testsRouter);
    
    var server = app.listen(4040,  err => {
      if (err) {
        console.log("error", "Error: " + err)
      }
      console.log("Server is running on port: " + server.address().port);
    });
   