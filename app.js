"use strict";

var express = require('express');
var app = express(),
    path = require('path');


app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'src')));
});

app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
