//Require Module Variables
const path = require('path'); //Reference to Node's Path Module
const express = require('express');
const config = require('./config');

//Application Object
const app = express();

//This is the path Express.static() will search for path resolutions
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

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