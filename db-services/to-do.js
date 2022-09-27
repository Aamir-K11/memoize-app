const { ToDoList } = require('../schemas/to-do-list')

const ToDoDBService = {
  findToDoList: async (_id) => {
    return await ToDoList.findOne({ _id })
  },

  createNewToDo: async (filter, update) => {
    return await ToDoList.updateOne(filter, update)
  },

  getToDos: async (_id) => {
    return await ToDoList.findOne({ _id }).select('todos').lean()
  },

  saveToDo: async (toDoList) => {
    await toDoList.save()
  }
}

module.exports = ToDoDBService
