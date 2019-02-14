var nodemailer = require('nodemailer');

class mailer{

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '@gmail.com',
            pass: ''
        }
    });

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
    sendActivateMail(source,target){
        var mailOptions = {
            from: source,
            to: target,
            subject: "welcome to exams system as admin",
            text: "active your user in this link : www.link.com"
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