var sql = require("mssql");
var config = require("./dbconfig");

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    console.log(config);
    // logger.log("error", "Can't create DB pool " + err + " stack:" + err.stack);
    console.log(err);
  } else {
    console.log("connected to DB");
  }
});

class DBContext {
  executeInDB(callback) {
    var req = dbPool.request();
    req.input("FName", sql.NVarChar(50), "Jerry");

    req.execute("GetUserByName", (err, data) => {
      if (err) {
        console.log("error", "Execution error calling 'getuserbyname'");
      } else {
        callback(data.recordset);
      }
    });
  } // executeInDB

  addQuestion(question, callback) {
    var dbreq = dbPool.request();
    var answers = question.answers;
    dbreq.input("type", sql.NVarChar(50), question.type);
    dbreq.input("text", sql.NVarChar(100), question.text);
    dbreq.input("subText", sql.NVarChar(100), question.subText);
    dbreq.input("oriontion", sql.NVarChar(50), question.layout);
    dbreq.input("tags", sql.NVarChar(300), question.tags);
    dbreq.execute("sp_addQuestion", (err, data) => {
      if (err) {
        callback(err);
      } else {
        answers.forEach(element => {
          dbreq = dbPool.request();
          dbreq.input("text", sql.NVarChar(100), element.text);
          dbreq.input("isCorrect", sql.Bit, element.correct);
          dbreq.input("questionID", sql.Int, data.recordset[0].id);
          dbreq.execute("sp_addAnswer", (err, data) => {
            if (err) {
              callback(err);
            }
          });
        });
        callback(data.recordset);
      }
    });
  }

  getQuestions(fieldID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldID", sql.Int, fieldID);
    dbreq.execute("sp_getQuesions", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordsets);
      }
    });
  }

  addTest(test, callback) {

    console.log(test);
    var dbreq = dbPool.request();
    dbreq.input("name", sql.NVarChar(50), test.testName);
    dbreq.input("lastModifiedDate", sql.Date, test.lastModifiedDate);
    dbreq.input("isActive", sql.Bit, test.isActive);
    dbreq.input("version", sql.Int, test.version);
    dbreq.input("link", sql.NVarChar(100), test.link);
    dbreq.input("passingGrade", sql.Float, test.passingGrade);
    dbreq.input("header", sql.NVarChar(100), test.header);
    dbreq.input("messageOnSuccess", sql.NVarChar(100), test.messageOnSuccess);
    dbreq.input("messageOnFailure", sql.NVarChar(100), test.messageOnFailure);
    dbreq.input("mailSender", sql.NVarChar(100), test.mailSender);
    dbreq.input("CC", sql.NVarChar(100), test.CC);
    dbreq.input("BCC", sql.NVarChar(100), test.BCC);
    dbreq.input("successMessageBody",sql.NVarChar(400),test.successMessageBody);
    dbreq.input("successMessageSubject",sql.NVarChar(400),test.successMessageSubject);
    dbreq.input("failMessageBody", sql.NVarChar(400), test.failMessageBody);
    dbreq.input("failMessageSubject",sql.NVarChar(400),test.failMessageSubject);
    dbreq.input("fieldID", sql.Int, test.fieldID);

    dbreq.execute("sp_addTest2", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }

  login(data, callback) {
    var dbreq = dbPool.request();
    dbreq.input("email", sql.NVarChar(50), data.email);
    dbreq.input("password", sql.NVarChar(50), data.password);
    dbreq.execute("sp_login", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordsets);
      }
    });
  }

  getTestById(testId, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testId", sql.NVarChar(50), testId);
    dbreq.execute("sp_getTestById", (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.recordset);
        callback(data.recordset);
      }
    });
  }

  getTestByLink(testLink, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testLink", sql.NVarChar(200), testLink);
    dbreq.execute("sp_getTestByLink", (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.recordset);
        callback(data.recordset);
      }
    });
  }

  getAllFields(callback){
    var dbreq = dbPool.request();
    dbreq.execute("sp_getAllFields", (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.recordsets);
        callback(data.recordsets);
      }
    });
  }

  activateTest(testId,callback){
    var dbreq = dbPool.request();
    console.log(testId.testID);
    dbreq.input("testID", sql.Int, testId.testID);
    dbreq.execute("sp_activateTest2", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }

  
  getTestByFieldId(fieldId, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldID", sql.Int, fieldId);
    dbreq.execute("sp_getTestsByField", (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.recordsets);
        callback(data.recordsets);
      }
    });
  }
}

module.exports = new DBContext();
