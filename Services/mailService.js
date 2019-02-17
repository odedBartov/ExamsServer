var nodemailer = require('nodemailer');

class mailer{

    //  transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: "exams.system1@gmail.com‏",
    //             pass: 'exam1234'
    //         }
    //     });
    

    sendOnFinisedTest(source,target,subject,text){
        //set Mail Options
        var mailOptions = {
            from: source,
            to: target,
            subject: subject,
            text: text
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    sendActivateMail(target){
   
        var transporter = nodemailer.createTransport({
        service: 'Gmail',
      
        auth: {
            user: 'exams.system1@gmail.com',
            pass: 'exam1234'
        }
    });

        var mailOptions = {
            from: 'exams.system1@gmail.com',
            to: target,
            subject: "welcome to exams system as admin",
            text: "active your user in this link : www.link.com/actibate/123"
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }




     sendtestmail(){
        
    //     var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: '@gmail.com',
    //         pass: ''
    //     }
    // });
  
    var mailOptions = {
        from: 'omercarmeli74@gmail.com',
        to: 'omercarmeli74@gmail.co',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}
}
module.exports = new mailer();