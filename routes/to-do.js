const express = require('express')
const router = express.Router()
// const { ToDoList } = require('../schemas/to-do-list')
// const JwtAuth = require('../middleware/jwt-auth')
// const Validator = require('../validators/to-do')
// const handleValidator = require('../middleware/run-validator')
// const ToDoController = require('../controllers/to-do')
// const { BadRequestError } = require('../errors')
// require('express-async-errors')

// router.post('/',
//   JwtAuth,
//   Validator.validateNewToDo(),
//   handleValidator,
//   ToDoController.createNewToDo,
//   async (req, res) => {
//     return res.send('ToDo list has been updated')
//   })

// router.get('/', JwtAuth, ToDoController.getToDos, async (req, res) => {
//   return res.send(req.body.todos)
// })

// router.put('/', [JwtAuth], async (req, res) => {
//   const { toDoId, title, description, priority } = req.body
//   if (!title && !description && !priority) throw new BadRequestError('Nothing to update')
//   const toDoList = await ToDoList.findOne({ _id: req.user.todolist_id })

//   const toDo = toDoList.todos.id(toDoId)
//   if (!toDo) throw new BadRequestError('ToDo item does not exist')

//   toDo.title = !(title) ? toDo.title : title
//   toDo.description = !(description) ? toDo.description : description
//   toDo.priority = !(priority) ? toDo.priority : priority

//   const updatedToDoList = await toDoList.save()

//   return res.send(updatedToDoList)
// })

// router.delete('/', [JwtAuth], async (req, res) => {
//   const { toDoId } = req.body
//   const toDoList = await ToDoList.findOne({ _id: req.user.todolist_id })

//   const toDo = toDoList.todos.id(toDoId)
//   if (!toDo) throw new BadRequestError('ToDo item does not exist')

//   toDo.remove()
//   const updatedToDoList = await toDoList.save()
//   return res.send(updatedToDoList)
// })

module.exports = router
