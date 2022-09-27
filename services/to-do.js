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

const updateToDos = async (_id, toDoObject) => {
  ToDoValidator.validateUpdateToDoInput(toDoObject)

  const toDoList = await ToDoDBService.findToDoList(_id)

  const toDo = toDoList.todos.id(toDoObject.toDoId)

  if (!toDo) throw new BadRequestError('ToDo item does not exist')

  toDo.title = !(toDoObject.title) ? toDo.title : toDoObject.title
  toDo.description = !(toDoObject.description) ? toDo.description : toDoObject.description
  toDo.priority = !(toDoObject.priority) ? toDo.priority : toDoObject.priority

  await ToDoDBService.saveToDo(toDoList)
}

module.exports = {
  createNewToDo,
  getToDos,
  updateToDos
}
