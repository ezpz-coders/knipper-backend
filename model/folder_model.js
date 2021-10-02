//Require Mongoose
const mongoose = require('mongoose');
const snippetSchema = require('./snippet_model');

//Define a schema
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  type: { type: String, required: true },
  snippets: [snippetSchema],
});

module.exports = folderSchema;
