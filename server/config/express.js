const express = require('express');
const stylus = require('stylus');
const logger = require('morgan');
const bodyParser = require('body-parser');

module.exports = function (app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile:compile
    }))
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    // Tell app where to look for the relevant files
    app.use(express.static(config.rootPath + '/public'))
}