const express = require('express')
const router = express.Router()
const JwtAuth = require('../middleware/jwt-auth')
const ToDoController = require('../controllers/to-do')

router.post('/', JwtAuth, ToDoController.createNewToDo)

router.get('/', JwtAuth, ToDoController.getToDos)

router.put('/', JwtAuth, ToDoController.updateToDos)

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
