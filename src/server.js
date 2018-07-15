//Required module variables
const path = require('path'); //Node's path module
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');

// Load mongoose package
const mongoose = require('mongoose');

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/animal.model.js');

//The app
const app = express();

//Public path and Body parser
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);

//Confirm good start and give location for access in browser
app.listen(config.port, function() {
  console.log(`${config.appName} can be accessed by navigating to 127.0.0.1:${config.port} in a browser.`);
});