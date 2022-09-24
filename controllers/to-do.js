const ToDoService = require('../services/to-do')
require('express-async-errors')

// const ToDoController = {

//   createNewToDo: async (req, res, next) => {
//     const toDoObject = {
//       title: req.body.title,
//       description: req.body.description,
//       priority: req.body.priority
//     }
//     const todolist = await ToDoList.updateOne({ _id: req.user.todolist_id }, { $push: { todos: toDoObject } }, { runValidators: true })

//     if (todolist.modifiedCount === 0) return res.send('ToDo list has not been updated')

//     return next()
//   },

//   getToDos: async (req, res, next) => {
//     req.body.todos = await ToDoList.findOne({ _id: req.user.todolist_id }).select('todos').lean()

//     return next()
//   }
// }

const createNewToDo = async (req, res) => {
  await ToDoService.createNewToDo(req.user.todolist_id, req.body)

  return res.send('ToDo has been created')
}
module.exports = {
  createNewToDo
}
