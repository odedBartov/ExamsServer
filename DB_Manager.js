var express = require("express");
var app = express();
var sql = require("mssql");
var config = require("./dbConfig");
const bodyParser = require("body-parser");
const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    logger.log("error", "Can't create DB pool " + err + " stack:" + err.stack);
    console.log(err);
  }
});

var server = app.listen(8080, function() {
  console.log("Server is running..");
});

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

app.post("/addQuestion", function(req, res) {
  var dbreq = dbPool.request();
  var answers = req.body.answers;
  dbreq.input("type", sql.NVarChar(50), req.body.type);
  dbreq.input("text", sql.NVarChar(100), req.body.text);
  dbreq.input("subText", sql.NVarChar(100), req.body.subText);
  dbreq.input("oriontion", sql.NVarChar(50), req.body.layout);
  dbreq.input("tags", sql.NVarChar(300), req.body.tags);
  dbreq.execute("sp_addQuestion", (err, data) => {
    if (err) {
      res.end(err);
    } else {
      answers.forEach(element => {
        dbreq = dbPool.request();
        dbreq.input("text", sql.NVarChar(100), element.text);
        dbreq.input("isCorrect", sql.Bit, element.correct);
        dbreq.input("questionID", sql.Int, data.recordset[0].id);
        dbreq.execute("sp_addAnswer", (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  });
  res.end();
});
