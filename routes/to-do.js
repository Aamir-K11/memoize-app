const express = require('express');
const router  = express.Router();
const {ToDo}  = require('../schemas/to-do');
const {ToDoList}  = require('../schemas/to-do-list');
const User    = require('../schemas/user');  
const JwtAuth  = require('../middleware/jwt-auth');
const { BadRequestError } = require('../errors');
require('express-async-errors');

router.post('/', [JwtAuth], async (req, res) => {

    const ToDoObject = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
    };

    const toDoDocument = await ToDo.create(ToDoObject);
    const user = await User.findOne({_id: req.user.user_id});

    if(!user.todolist) throw new BadRequestError('No todo list exists for this user');

    const todolist = await ToDoList.updateOne({_id: user.todolist}, {$push: {todos: toDoDocument}});

    if(todolist.modifiedCount > 0)   return res.send('ToDo list has been updated');

    return res.send('ToDo list has not been updated');
  
});

router.get('/', [JwtAuth], async (req, res) => {
    const ToDos = await ToDo.find();
    return res.send(ToDos);
});

module.exports = router;