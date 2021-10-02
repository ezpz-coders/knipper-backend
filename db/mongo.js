//Import the mongoose module
var mongoose = require('mongoose');
const { MONGO_URI } = require('../config')

//Set up default mongoose connection
console.log(process.env.NODE_ENV);
var mongoDB = MONGO_URI;
if (process.env.NODE_ENV === "development") {
    mongoose.connect("mongodb://localhost:27017/knipper", {useNewUrlParser: true, useUnifiedTopology: true});
  }
if (process.env.NODE_ENV === "production") {
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
}


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => { console.log("Mongo connected") });

module.exports = db