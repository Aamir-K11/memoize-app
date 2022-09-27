const ToDoService = require('../services/to-do')
require('express-async-errors')

const createNewToDo = async (req, res) => {
  await ToDoService.createNewToDo(req.user.todolist, req.body)

  return res.send('ToDo has been created')
}

const getToDos = async (req, res) => {
  const toDos = await ToDoService.getToDos(req.user.todolist)

  return res.send(toDos)
}

const updateToDos = async (req, res) => {
  await ToDoService.updateToDos(req.user.todolist, req.body)

  return res.send('ToDo has been updated')
}

module.exports = {
  createNewToDo,
  getToDos,
  updateToDos
}
