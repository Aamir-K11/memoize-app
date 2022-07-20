const mongoose = require('mongoose')
const PasswordHashHook = require('./hooks/password-hash')

const UserSchema = new mongoose.Schema({

  firstname: {
    type: String,
    required: true,
    trim: true
  },

  lastname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  password:
    {
      type: String,
      required: true,
      minLength: 8
    },

  isVerified:
    {
      type: Boolean,
      default: false
    },

  todolist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToDoList',
    required: true
  }
})

PasswordHashHook(UserSchema)

// Virtual for getting full name - Virtuals are not persisted to DB.
UserSchema.virtual('fullName').get(function () {
  return this.firstname + ' ' + this.lastname
})

const User = mongoose.model('User', UserSchema)

module.exports = User
