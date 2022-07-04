const express = require('express');
const toDo = require('../routes/to-do');
const errorHandler = require('../middleware/error-handler');
const User = require('../routes/user');


module.exports = function(app) 
{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/todo', toDo);
    app.use('/user', User)
    app.use(errorHandler);
}