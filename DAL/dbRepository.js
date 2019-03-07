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
  answersToTVP(answers) {
    let tbl = new sql.Table();
    tbl.columns.add("text", sql.NVarChar(100));
    tbl.columns.add("isCorrect", sql.Bit);
    answers.forEach(element => {
      tbl.rows.add(element.text, element.correct);
    });
    return tbl;
  }
  answeredQuestionsToTVP(answersIDs) {
    let tbl = new sql.Table();
    // tbl.columns.add("userID", sql.Int);
    tbl.columns.add("answerID", sql.Int);
    answersIDs.forEach(element => {
      tbl.rows.add(element);
    });
    return tbl;
  }

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
    // var answers = question.answers;
    dbreq.input("type", sql.NVarChar(50), question.type);
    dbreq.input("text", sql.NVarChar(100), question.text);
    dbreq.input("subText", sql.NVarChar(100), question.subText);
    dbreq.input("layout", sql.NVarChar(50), question.layout);
    dbreq.input("tags", sql.NVarChar(300), question.tags);
    dbreq.input("fieldID", sql.Int, question.fieldID);
    dbreq.input("answers", sql.TVP, this.answersToTVP(question.answers));
    dbreq.input("corrects", sql.Int, question.answers.filter(a => a.correct).length
    );
    dbreq.execute("sp_addQuestion", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    });
  }
  getQuestions(fieldID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldID", sql.Int, fieldID);
    dbreq.execute("sp_getQuestions", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    });
  }
  getQuestionsForTest(testID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testID", sql.Int, testID);
    dbreq.execute("sp_getQuestionsForTest", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    })
  }
  updateQuestion(question, callback) {
    var dbreq = dbPool.request();
    var answers = question.answers;
    dbreq.input("ID", sql.Int, question.ID);
    dbreq.input("type", sql.NVarChar(50), question.type);
    dbreq.input("text", sql.NVarChar(100), question.text);
    dbreq.input("subText", sql.NVarChar(100), question.subText);
    dbreq.input("layout", sql.NVarChar(50), question.layout);
    dbreq.input("tags", sql.NVarChar(300), question.tags);
    dbreq.input("fieldID", sql.Int, question.fieldID);
    dbreq.input("answers", sql.TVP, this.answersToTVP(question.answers));
    dbreq.input(
      "corrects",
      sql.Int,
      question.answers.filter(a => a.correct).length
    );
    dbreq.execute("sp_updateQuestion", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    });
  }
  getAnswers(questionID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("questionID", sql.Int, questionID);
    dbreq.execute("sp_getAnswers", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    });
  }
  addTest(test, callback) {
    //console.log(test);
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
    dbreq.input(
      "successMessageBody",
      sql.NVarChar(400),
      test.successMessageBody
    );
    dbreq.input(
      "successMessageSubject",
      sql.NVarChar(400),
      test.successMessageSubject
    );
    dbreq.input("failMessageBody", sql.NVarChar(400), test.failMessageBody);
    dbreq.input(
      "failMessageSubject",
      sql.NVarChar(400),
      test.failMessageSubject
    );
    dbreq.input("fieldID", sql.Int, test.fieldID);

    dbreq.execute("sp_addTest", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }
  getTestsForField(fieldID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldId", sql.Int, fieldID);
    dbreq.execute("sp_getTestsForField", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    });
  }
  getTestsInRange(request, callback) {
    var dbreq = dbPool.request();
    dbreq.input("dateFrom", sql.Date, request.dateFrom);
    dbreq.input("dateTo", sql.Date, request.dateTo);
    dbreq.input("testID", sql.Int, request.testID);
    dbreq.execute("sp_getTestsInRange", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordsets);
      }
    });
  }
  getAllAnsweredTest(testID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testID", sql.Int, testID);
    dbreq.execute("sp_getAllAnsweredTests", (err, data) => {
      if (err){
        callback(err);
      } else {
        callback(data.recordsets);
      }
    })
  }
  getTestById(testId, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testId", sql.NVarChar(50), testId);
    dbreq.execute("sp_getTestById", (err, data) => {
      if (err) {
        callback(err);
      } else {
     //   console.log(data.recordset);
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
     //   console.log(data.recordset);
        callback(data.recordset);
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
  getAllFields(callback) {
    var dbreq = dbPool.request();
    dbreq.execute("sp_getAllFields", (err, data) => {
      if (err) {
        callback(err);
      } else {
   //     console.log(data.recordsets);
        callback(data.recordsets);
      }
    });
  }
  activateTest(testId, callback) {
    var dbreq = dbPool.request();
   // console.log(testId.testID);
    dbreq.input("testID", sql.Int, testId.testID);
    dbreq.execute("sp_activateTest2", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }

  
  getTestsByFieldId(fieldId, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldId", sql.Int, fieldId);
    dbreq.execute("sp_getTestByFieldForTable", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }

  submitTest(test, callback) {
    var dbreq = dbPool.request();
    dbreq.input("testID", sql.Int, test.testID);
    dbreq.input("userID", sql.Int, test.userID);
    dbreq.input("isFinished", sql.Bit, test.isFinished);
    dbreq.input("currentQuestion", sql.Int, test.currentQuestion);
    dbreq.input("grade", sql.Int, test.grade);
    dbreq.input("answers", sql.TVP, this.answeredQuestionsToTVP(test.answers));
    dbreq.execute("sp_submitTest", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    });
  }

  getQuestionByFieldId(fieldId, callback) {
    var dbreq = dbPool.request();
    dbreq.input("fieldID", sql.Int, fieldId);
    dbreq.execute("sp_getQuestionsByFieldForTable", (err, data) => {
      if (err) {
        callback(err);
      } else {
        //console.log(data.recordsets);
        callback(data.recordsets);
      }
    });
  }

  getQuestionById(questionId,callback){
    var dbreq = dbPool.request();
    dbreq.input("ID", sql.Int, questionId);
    dbreq.execute("sp_getQuestionById", (err, data) => {
      if (err) {
        callback(err);
      } else {
        //console.log(data.recordsets);
        callback(data.recordset);
      }
    });
  }

  getAnswersByQuestionId(questionId,callback){
    var dbreq = dbPool.request();
    console.log("in getAnswersByQuestionId");
    console.log(questionId);
    dbreq.input("questionID", sql.Int, questionId);
    dbreq.execute("sp_getAnswersByQuestionId", (err, data) => {
      if (err) {
        callback(err);
      } else {
        console.log(data.recordsets);
        callback(data.recordsets);
      }
    });
  }

  addQuestionsForTest(testId,QuestionList,callback){
 //   console.log(testId);
 //   console.log(QuestionList);
    for(let i=0;i<QuestionList.length;i++){
 //     console.log("test id: "+testId);
 //     console.log(QuestionList[i])
      var dbreq = dbPool.request();
      dbreq.input("testID", sql.Int, testId);
      dbreq.input("questionID", sql.Int,+QuestionList[i]);
      dbreq.execute("sp_addQuestionsForTest", (err, data) => {
        if (err) {
          callback(err);
        } else {
         // console.log(data.recordset);
          //callback("ok");
        }
      });

     }


  }

  getQuestionByTestId(testId,callback){
    var dbreq = dbPool.request();
    dbreq.input("testId", sql.Int, testId);
    dbreq.execute("sp_getQuestionByTestId", (err, data) => {
      if (err) {
        callback(err);
      } else {
      //  console.log(data.recordsets);
        callback(data.recordsets);
      }
    });

  }

  addUser(){
    var dbreq = dbPool.request();
    // dbreq.input("fieldID", sql.Int, fieldId);
    // dbreq.input("fieldID", sql.Int, fieldId);
    // dbreq.input("fieldID", sql.Int, fieldId);
    // dbreq.execute("sp_getQuestionsByFieldForShow", (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     console.log(data.recordsets);
    //     callback(data.recordsets);
    //   }
    // });
  }


  getAllStudents(callback) {
    var dbreq = dbPool.request();
    dbreq.execute("sp_getAllStudents", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    })
  }
  getTestForStudent(studentID, callback) {
    var dbreq = dbPool.request();
    dbreq.input("studentID", sql.Int, studentID);
    dbreq.execute("sp_getTestsForStudent", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordset);
      }
    })
  }
  getQuestionsAndAnsweresForAnsweredTest(details, callback) {
    var dbreq = dbPool.request();
    dbreq.input("answeredTestID", sql.Int, details.answeredTestID);
    dbreq.input("testID", sql.Int, details.testID);
    dbreq.input("studentID", sql.Int, details.studentID);
    dbreq.execute("sp_getQuestionsAndAnsweresForAnsweredTest", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data.recordsets);
      }
    });
  }
}

module.exports = new DBContext();
