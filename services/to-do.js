const ToDoDBService = require('../db-services/to-do')
const ToDoValidator = require('../validators/to-do')
const { BadRequestError } = require('../errors')

const createNewToDo = async (_id, toDoObject) => {
  ToDoValidator.validateNewToDoInput(toDoObject)
  const todolist = await ToDoDBService.createNewToDo({ _id }, { $push: { todos: toDoObject } })

  if (todolist.modifiedCount === 0) throw new BadRequestError('Failed to update ToDo list')
}

const getToDos = async (_id) => {
  return await ToDoDBService.getToDos(_id)
}

module.exports = {
  createNewToDo,
  getToDos
}
