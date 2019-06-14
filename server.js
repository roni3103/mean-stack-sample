var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var config = require('./config');

var env = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile:compile
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Tell app where to look for the relevant files
app.use(express.static(__dirname + '/public'))

if(env == "development"){
    mongoose.connect('mongodb://localhost/multivision');
}else {
    // mongoose.connect('mongodb://roni:multivision1@ds135427.mlab.com:35427/multivision')
<<<<<<< HEAD
    // mongoose.connect('mongodb://theUser:training1@ds251179.mlab.com:51179/magickeeper');
=======
    // mongoose.connect('mongodb://theUser:training1@ds251179.mlab.com:51179/magickeeper')
>>>>>>> 186f078500784a55ad0c1f707e24475565aff57a
    mongoose.connect('mongodb://theUser:training1@ds235417.mlab.com:35417/magiccards')
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});
console.log('the db is ', db)
// COMMENTED OUT THE MESSAGE COLLECTION STUFF AS NOT USING AT THE MINUTE
var cardSchema = mongoose.Schema({Name: String, Collection: String, message: String});
var Card = mongoose.model('Card', cardSchema);
var mongoMessage=[];
Card.find().exec(function(err, messageDoc) {
     console.log('results', messageDoc)
//   mongoMessage = messageDoc.Name;
  for(x in messageDoc){
      console.log(x, messageDoc[x].message)
    //   if(messageDoc[x].message){
        mongoMessage.push(messageDoc[x].message)
    //     console.log('the message is ', messageDoc[x].message)
    //   }
      console.log('mongomessage is ', mongoMessage)
      
  }
});

app.get('/partials/pictures', function(req, res){
    res.render('partials/pictures', {
        mongoMessage: mongoMessage
    })
})

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
})

const port=process.env.PORT || 3030;
app.listen(port);
console.log('App listening on port ', port)