const { ToDoList } = require('../schemas/to-do-list')

const ToDoDBService = {
  createNewToDo: async (filter, update) => {
    return await ToDoList.updateOne(filter, update)
  }
}

module.exports = ToDoDBService
