/*
    Video: https://www.youtube.com/watch?v=38aE1lSAJZ8
    Don't forget to disable less secure app from Gmail: https://myaccount.google.com/lesssecureapps TODO:
*/

///////////////////////////////////////////////////////////////
// Send email
// require('dotenv').config();

// Requiere
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
var Queue = require('better-queue');
var MongoClient = require('mongodb').MongoClient;

// Const
// create a file only file logger
const log = require('simple-node-logger').createSimpleFileLogger('project.log');

/**Debut de la config */
let transporter = nodemailer.createTransport({
  /*service: 'gmail',
  auth: {
    // user: process.env.EMAIL || 'bootnetcrasher@gmail.com', // TODO: your gmail account 
    user: 'bootnetcrasher@gmail.com', // TODO: your gmail account 
    pass: '29121990marie' // TODO: your gmail password
  }*/
  host: 'mail.chapmaison.com'
});

transporter.use('compile', hbs({
  viewEngine: 'express-handlebars',
  viewPath: './views/'
}));

/**Fin de la config */

// Envoi de mail
var sendMail = function (element) {
  let mailOptions = {
    from: 'bootnetcrasher@gmail.com',
    to: 'bootnetcrasher@gmail.com',
    // to: element.email,
    subject: 'Trouver une maison avec ChapMaison',
    text: 'Wooohooo it works!!',
    template: 'index',
    context: {
      name: 'Accime Esterling'
    } // send extra values to template
  };

  transporter.sendMail(mailOptions, (errorSend, data) => {
    
    if (errorSend) {
      /*MongoClient.connect("mongodb://localhost:27017/mydb", function (errorConnect, client) {
        var db = client.db('mydb');
        var myquery = { id: element.id };
        var newvalues = { $set: {statut: -1 } };
        db.collection("Users").updateOne(myquery, newvalues, function(error, res) {
          if (error) throw error;
          console.log("email non envoyé a "+element.email+" erreur : "+errorSend);
          client.close();
        });
      })*/
      // return log('Error occurs');
      log.info("mail non envoyé");
    }else{
      /*MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
        var db = client.db('mydb');
        var myquery = { id: element.id };
        var newvalues = { $set: {statut: 1 } };
        db.collection("Users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("email envoyé a "+element.email);
          client.close();
        });
      })*/
      log.info("mail  envoyé");
    }
      // return log('Email sent!!!');
  });
  
}

var q = new Queue(function (input, cb) {
  // console.log(input);
  sendMail(input);
  cb(null, result);
});

/*MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
  if (err) throw err;
  var db = client.db('mydb');
  db.collection('Users', function (err, collection) {
    // Fetch all results
    collection.find({'statut': 0}).limit(10).forEach(function(items) {
      q.push(items, function (err, result) {
        // console.log("execution de la tache");
      });
    }, function(err) {
      // done or error
      console.log("une erreur "+err);
    });
    client.close();
  });
});*/

q.push(1, function (err, result) {
  // console.log("execution de la tache");
});

log.info("!!!!!!!! Fin de l'instruction !!!!!!!!");