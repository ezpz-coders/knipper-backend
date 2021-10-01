//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_name: String,
  email: {type: String, required: true},
  password: {type: String, required: true}
});

module.exports = userSchema;