//Require Mongoose
var mongoose = require('mongoose')
var snippetSchema = require('./snippet_model')

//Define a schema
var Schema = mongoose.Schema

var folderSchema = new Schema({
  type: { type: String, required: true },
  snippets: [snippetSchema]
})

module.exports = folderSchema
