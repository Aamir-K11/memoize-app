const express = require('express');
const toDo = require('../routes/to-do');
const User = require('../routes/user');
const Auth = require('../routes/auth');
const errorHandler = require('../middleware/error-handler');

module.exports = function(app) 
{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/todo', toDo);
    app.use('/user', User);
    app.use('/auth', Auth);
    app.use(errorHandler);
}