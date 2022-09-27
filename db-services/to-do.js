const { ToDoList } = require('../schemas/to-do-list')

const ToDoDBService = {
  createNewToDo: async (filter, update) => {
    return await ToDoList.updateOne(filter, update)
  },

  getToDos: async (_id) => {
    return await ToDoList.findOne({ _id }).select('todos').lean()
  }
}

module.exports = ToDoDBService
