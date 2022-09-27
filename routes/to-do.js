const express = require('express')
const router = express.Router()
const JwtAuth = require('../middleware/jwt-auth')
const ToDoController = require('../controllers/to-do')

router.post('/', JwtAuth, ToDoController.createNewToDo)

router.get('/', JwtAuth, ToDoController.getToDos)

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
