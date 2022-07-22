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

  if (todolist.modifiedCount === 0) return res.send('ToDo list has not been updated')

  return res.send('ToDo list has been updated')
})

router.delete('/', [JwtAuth], async (req, res) => {
  const { toDoId } = req.body

  const { todos } = await ToDoList.findOne({ _id: req.user.todolist_id }).select('todos')

  const filteredToDos = todos.filter((td) => td._id != toDoId)

  const updatedToDoList = await ToDoList.updateOne({ _id: req.user.todolist_id }, { todos: filteredToDos }, { runValidators: true })

  if (updatedToDoList.modifiedCount === 0) throw new BadRequestError('ToDo item doesnot exist')

  return res.send('ToDo list has been updated')
})

router.put('/', [JwtAuth], async (req, res) => {
  const { toDoId, title, description, priority } = req.body
  if (!title && !description && !priority) throw new BadRequestError('Nothing to update')
  const { todos } = await ToDoList.findOne({ _id: req.user.todolist_id }).select('todos')

  todos.forEach(td => {
    if (td._id == toDoId) {
      td.title = !title ? td.title : title
      td.description = !description ? td.description : description
      td.priority = !priority ? td.priority : priority
    }
  })

  const updatedToDoList = await ToDoList.updateOne({ _id: req.user.todolist_id }, { todos }, { runValidators: true })

  if (updatedToDoList.modifiedCount === 0) throw new BadRequestError('No change hsa been made')

  return res.send('ToDo has been updated')
})

module.exports = router
