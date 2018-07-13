//Require Module Variables
const express = require('express');
const config = require('./config');

//Application Object
const app = express();

//Test Code with a Route
app.use('/doc', function(req, res, next) {
    res.end(`Documentation http://expressjs.com/`);
});

//Test Code
app.use(function(req, res, next) {
    res.end("Hello World!");
});

app.listen(config.port, function() {
    console.log(`${config.appName} is accessible by navigating to 127.0.0.1:${config.port}`);
});