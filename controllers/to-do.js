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

module.exports = {
  createNewToDo,
  getToDos
}
