//Require Mongoose
const mongoose = require('mongoose');
const folderSchema = require('./folder_model');

//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: String,
  email: String,
  password: String,
  user_type: {type: String, enum:["user", "admin"], default: "user"},
  folders: [folderSchema]
});

module.exports = userSchema;
