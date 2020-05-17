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
const log = console.log;

/**Debut de la config */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: process.env.EMAIL || 'bootnetcrasher@gmail.com', // TODO: your gmail account 
        user: 'bootnetcrasher@gmail.com', // TODO: your gmail account 
        pass: '29121990marie' // TODO: your gmail password
    }
});

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));

/**Fin de la config */

// Envoi de mail
var sendMail = function(element){
  console.log("l'id de l'element est "+element.id);
  let mailOptions = {
    from: 'bootnetcrasher@gmail.com',
    // to: 'bootnetcrasher@gmail.com',
    to: element.email,
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    template: 'index',
    context: {
        name: 'Accime Esterling'
    } // send extra values to template
  };

  console.log("email est "+element.email);
  /*transporter.sendMail(mailOptions, (err, data) => {
    
    if (err) {
      MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
        var db = client.db('mydb');
        var myquery = { id: element.id };
        var newvalues = { $set: {statut: 0 } };
        db.collection("Persons").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          client.close();
        });
      })
      // return log('Error occurs');
    }else{
      MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {
        var db = client.db('mydb');
        var myquery = { id: element.id };
        var newvalues = { $set: {statut: 1 } };
        db.collection("Persons").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          client.close();
        });
      })
    }
      // return log('Email sent!!!');
  });*/
  // console.log("mail envoyé ");
  // console.log("email "+element.email);
}

var q = new Queue(function (input, cb) {
  // console.log(input);
  sendMail(input);
  cb(null, result);
});
/*q.push("bootnetcrasher@gmail.com", function (err, result) {
    // console.log("execution de la tache");
});
q.push("bootnetcrasher@gmail.com", function (err, result) {
    // console.log("execution de la tache");
});*/


MongoClient.connect("mongodb://localhost:27017/mydb", function (err, client) {

  if (err) throw err;

  //Write databse Insert/Update/Query code here..
  // console.log("nous sommes connecté à la base de données mangodb");
  var db = client.db('mydb');

  /*for (var i = 0; i < 400000; i++) {
    // console.log("test " + i);
    db.collection('Persons', function (err, collection) {

      collection.insertOne({ id: i, firstName: 'Steve', lastName: 'Jobs' });
      // collection.insertOne({ id: 2, firstName: 'Bill', lastName: 'Gates' });
      // collection.insertOne({ id: 3, firstName: 'James', lastName: 'Bond' });
  
  
  
      db.collection('Persons').count(function (err, count) {
        if (err) throw err;
  
        console.log('Total Rows: ' + count);
      });
    });
  }*/
  /*db.collection("Persons").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    // db.close();
  });*/
  // var status = db.serverStatus();
    // console.log(db); 
  // db.close();
  db.collection('UsersNew', function (err, collection) {
    // collection.insertOne({ id: 1, firstName: 'Steve', lastName: 'Jobs', email: 'bsdhfds1@yopmail.com' });
    // collection.insertOne({ id: 2, firstName: 'Bill', lastName: 'Gates', email: 'bsdhfds2f@yopmail.com'});
    // collection.insertOne({ id: 3, firstName: 'James', lastName: 'Bond', email: 'bsdhfds3f@yopmail.com' });

    /*db.collection('Persons').count(function (err, count) {
      if (err) throw err;
      console.log('Total Rows: ' + count);
    });*/

    // Fetch all results
    collection.find().toArray(function(err, items) {
      /*items.forEach(element => { 
        // console.log(element.email); 
        q.push(element, function (err, result) {
          // console.log("execution de la tache");
        });
      }); */
      //assert.equal(null, err);
      // assert.equal(0, items.length);
      // db.close();
      // console.log("liste des elements ");
      // console.log(items[0].firstName);
    });
    client.close();
  });
});

console.log("!!!!!!!! Fin de l'instruction !!!!!!!!");