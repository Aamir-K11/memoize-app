const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const { BadRequestError } = require('../errors')
const { ToDoList } = require('../schemas/to-do-list')
require('express-async-errors')

router.post('/signup', async (req, res) => {
  const newUser =
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        }

  const existingUser = await User.findOne({ email: newUser.email })

  if (existingUser) throw new BadRequestError('Email already associated with a user')

  newUser.todolist = await ToDoList.create({})

  const createdUser = await User.create(newUser)
  return res.send(createdUser)
})

module.exports = router
