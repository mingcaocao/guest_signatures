const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./models/signature.js');
const app = express();
const url = process.env.MONGOLAB_URL;

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.json('You did it');
});

app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
  });
});

app.post('/api/signatures', function(req, res) {
  console.log(req.body);
  var signature = new Signature({
    guestSignature: req.body.SignatureOfGuest,
    message: req.body.MessageOfGuest
  });
  signature.save(function(data, err){
    if(err){
      res.send(err);
    }else{
      res.json(data);
    }
  });
});

mongoose.connect(url, function (err, db) {
  if(err) {
    console.log('Unable to connect to the mongoDB server with url: ', url, ' Error: ', err);
  } else {
    console.log('Connection established to', url);
  }
});

app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
