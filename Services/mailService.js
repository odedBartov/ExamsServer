var nodemailer = require('nodemailer');

class mailer{

     sendtestmail(){
        
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '@gmail.com',
            pass: ''
        }
    });
  
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