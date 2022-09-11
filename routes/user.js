const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const { BadRequestError } = require('../errors')
const { ToDoList } = require('../schemas/to-do-list')
const { sendEmail } = require('../services/email/email-service')
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

  const verificationCode = Math.random().toString(36).slice(2)

  await sendEmail({
    from: process.env.EMAIL_USER,
    sender: 'no-reply@memoize.com',
    to: createdUser.email,
    text: `The verification code is: ${verificationCode}`
  });

  return res.send(`User with email ${createdUser.email} has been created`)
})

module.exports = router
