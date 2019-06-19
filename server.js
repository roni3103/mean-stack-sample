const express = require('express');

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


var env = process.env.NODE_ENV || 'production';

// we need to match our environments with those available in our config
// anything else will just error

var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username:username}).exec(function(err, user){
            if(user && user.authenticate(password)){
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
})

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