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
    mongoose.connect('mongodb://roni:multivision1@ds135427.mlab.com:35427/multivision')
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});

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