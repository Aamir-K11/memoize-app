const mongoose = require('mongoose')
const { ToDoSchema } = require('../schemas/to-do')

const ToDoListSchema = mongoose.Schema({

  todos: {
    type: [ToDoSchema],
    default: []
  }

})

const ToDoList = mongoose.model('ToDoList', ToDoListSchema)

module.exports = {
  ToDoListSchema,
  ToDoList
}
