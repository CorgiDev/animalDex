//Require Module Variables
const router = require('./routes'); //Routes reference
const path = require('path'); //Reference to Node's Path Module
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/animal.model.js');

//Application Object
const app = express();

//This is the path Express.static() will search for path resolutions
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//Tells app to use Body Parser
app.use(function(req, res, next) {
    console.log("req.body BEFORE parsing", req.body);
    next();
  })
  
  app.use(bodyParser.json());
  
  app.use(function(req, res, next) {
    console.log("req.body AFTER parsing", req.body);
    next();
  })

//Causes the app to use the router
app.use(express.static(publicPath));
app.use('/api', router);

//Test Code
app.use(function(req, res, next) {
    res.end("Hello World!");
});

app.listen(config.port, function() {
    console.log(`${config.appName} is accessible by navigating to 127.0.0.1:${config.port}`);
});