//Import the mongoose module
var mongoose = require('mongoose');
const { MONGO_URI } = require('../config')

//Set up default mongoose connection
var mongoDB = MONGO_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => { console.log("Mongo connected") });

module.exports = db