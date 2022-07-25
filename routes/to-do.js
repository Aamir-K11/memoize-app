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

router.get('/', [JwtAuth], async (req, res) => {
  const { todos } = await ToDoList.findOne({ _id: req.user.todolist_id }).select('todos').lean()

  return res.send(todos)
})

router.put('/', [JwtAuth], async (req, res) => {
  const { toDoId, title, description, priority } = req.body
  if (!title && !description && !priority) throw new BadRequestError('Nothing to update')
  const toDoList = await ToDoList.findOne({ _id: req.user.todolist_id })

  const toDo = toDoList.todos.id(toDoId)
  if (!toDo) throw new BadRequestError('ToDo item does not exist')

  toDo.title = !(title) ? toDo.title : title
  toDo.description = !(description) ? toDo.description : description
  toDo.priority = !(priority) ? toDo.priority : priority

  const updatedToDoList = await toDoList.save()

  return res.send(updatedToDoList)
})

router.delete('/', [JwtAuth], async (req, res) => {
  const { toDoId } = req.body
  const toDoList = await ToDoList.findOne({ _id: req.user.todolist_id })

  const toDo = toDoList.todos.id(toDoId)
  if (!toDo) throw new BadRequestError('ToDo item does not exist')

  toDo.remove()
  const updatedToDoList = await toDoList.save()
  return res.send(updatedToDoList)
})

module.exports = router
