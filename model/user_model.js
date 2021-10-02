//Require Mongoose
var mongoose = require('mongoose');
var folderSchema = require("./folder_model")

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_name: String,
  email: String,
  password: String,
  folders: [folderSchema]
});

module.exports = userSchema;