const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var folderRouter = require('./routes/folder')
var snippetsRouter = require('./routes/snippets')

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', indexRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/folder', folderRouter)
app.use('/api/v1/snippets', snippetsRouter)


// catch 404 and forward to error handler

module.exports = app;
