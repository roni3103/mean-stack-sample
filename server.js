var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

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

app.get('*', function(req, res) {
    res.render('index');
})

const port=3030;
app.listen(port);
console.log('App listening on port ', port)