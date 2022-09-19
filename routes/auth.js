const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateEmailAndPassword = require('../validators/user-validator')
const handleValidator = require('../middleware/run-validator')
const { BadRequestError } = require('../errors')
require('express-async-errors')
require('dotenv').config()

router.post('/login', validateEmailAndPassword(), handleValidator, async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) throw new BadRequestError('Invalid Email or Password')

  if (!user.isVerified) throw new BadRequestError('User account in not verified. Please verify your account')

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
