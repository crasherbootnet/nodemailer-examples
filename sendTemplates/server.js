/*
    Video: https://www.youtube.com/watch?v=38aE1lSAJZ8
    Don't forget to disable less secure app from Gmail: https://myaccount.google.com/lesssecureapps TODO:
*/

///////////////////////////////////////////////////////////////
// Send email
// require('dotenv').config();

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: process.env.EMAIL || 'bootnetcrasher@gmail.com', // TODO: your gmail account 
        user: 'bootnetcrasher@gmail.com', // TODO: your gmail account 
        pass: '29121990marie' // TODO: your gmail password
    }
});

// Step 2
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));
/*
// Step 3
let mailOptions = {
    from: 'bootnetcrasher@gmail.com',
    to: 'bootnetcrasher@gmail.com',
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    template: 'index',
    context: {
        name: 'Accime Esterling'
    } // send extra values to template
};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});
*/
///////////////////////////////////////////////////////////////
// Queue
/*const queue = require('queue');
var q = queue();
var results = [];
// add jobs using the familiar Array API
q.push(function (cb) {
    results.push('two')
    cb()
  })*/

  var Queue = require('better-queue');

/*var q = new Queue(function (input, cb) {
  
  // Some processing here ...
  console.log("execute job");
  cb(null, result);
})
q.push(1)
q.push({ x: 1 })*/

/*function checker (data, callback) {
  console.log(data)
  callback()
}

const q = new Queue(checker)

function test () {
  q.push({data: 1})
  q.push({data: 2})
  q.push({data: 3})
  q.push({data: 4})
}

test()*/

var q = new Queue(function (input, cb) {
    let mailOptions = {
        from: 'bootnetcrasher@gmail.com',
        // to: 'bootnetcrasher@gmail.com',
        to: input,
        subject: 'Nodemailer - Test',
        text: 'Wooohooo it works!!',
        template: 'index',
        context: {
            name: 'Accime Esterling'
        } // send extra values to template
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        // return log('Email sent!!!');
    });
  cb(null, result);
});
q.push("bootnetcrasher@gmail.com", function (err, result) {
    // console.log("execution de la tache");
});
q.push("bootnetcrasher@gmail.com", function (err, result) {
    // console.log("execution de la tache");
});


console.log("Sent mail !");