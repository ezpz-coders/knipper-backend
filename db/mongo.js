//Import the mongoose module
const mongoose = require('mongoose');
const { MONGO_URI, NODE_ENV } = require('../config');

//Set up default mongoose connection

if (NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost:27017/knipper', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
else if (NODE_ENV === 'production' || MONGO_URI) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => {
  console.log('Mongo connected');
});

module.exports = db;
