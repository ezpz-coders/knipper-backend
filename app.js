const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const folderRouter = require('./routes/folder')
const snippetsRouter = require('./routes/snippets')

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
