var express = require('express');

var mongoose = require('mongoose');
// var config = require('./config');

var env = process.env.NODE_ENV || 'development';

// we need to match our environments with those available in our config
// anything else will just error

var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

// COMMENTED OUT THE MESSAGE COLLECTION STUFF AS NOT USING AT THE MINUTE
// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc) {
//   mongoMessage = messageDoc.message;
// });



app.listen(config.port);
console.log('App listening on port ', config.port)