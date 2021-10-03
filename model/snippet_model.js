//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  playground: String,
});

module.exports = snippetSchema;
