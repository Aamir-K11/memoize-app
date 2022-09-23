const User = require('../schemas/user')
const { ToDoList } = require('../schemas/to-do-list')

const UserDBService = {

  findUserByEmail: async (email) => {
    return await User.findOne({ email })
  },

  createNewUser: async (newUser) => {
    newUser.todolist = await ToDoList.create({})

    return await User.create(newUser)
  },

  updateUser: async (filter, update) => {
    return await User.updateOne(filter, update)
  },

  saveUser: async (user) => {
    return await user.save()
  }
}

module.exports = UserDBService
