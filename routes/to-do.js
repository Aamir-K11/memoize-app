const express = require('express')
const router = express.Router()
const { ToDoList } = require('../schemas/to-do-list')
const User = require('../schemas/user')
const JwtAuth = require('../middleware/jwt-auth')
const { BadRequestError } = require('../errors')
require('express-async-errors')

router.post('/', [JwtAuth], async (req, res) => {
  const toDoObject = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority
  }

  const user = await User.findOne({ _id: req.user.user_id })

  if (!user.todolist) throw new BadRequestError('No todo list exists for this user')

  const todolist = await ToDoList.updateOne({ _id: user.todolist }, { $push: { todos: toDoObject } })

  if (todolist.modifiedCount > 0) return res.send('ToDo list has been updated')

  return res.send('ToDo list has not been updated')
})

module.exports = router
