//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var snippetSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    playground: String
});

module.exports = snippetSchema;