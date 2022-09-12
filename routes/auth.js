const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
require('express-async-errors')
require('dotenv').config()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!(email && password)) {
    throw new BadRequestError('Please enter your login credentials')
  }

  const user = await User.findOne({ email })

  if (!user) throw new BadRequestError('Invalid Email or Password')

  if (!user.isVerfied) throw new BadRequestError('User account in not verified. Pleas verify your account')

  const confirmPassword = await bcrypt.compare(password, user.password)

  if (!confirmPassword) throw new BadRequestError('Invalid Email or Password')

  const jwtToken = await jwt.sign(
    {
      user_id: user._id,
      email: user.email,
      todolist_id: user.todolist._id
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' })

  return res.send(jwtToken)
})

module.exports = router
