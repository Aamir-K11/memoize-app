const User = require('../schemas/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
require('express-async-errors')
require('dotenv').config()

const UserController = {
  findUserByEmail: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) throw new BadRequestError('Invalid Email or Password')

    req.user = user
    return next()
  },

  checkIfUserVerified: async (req, res, next) => {
    if (!req.user.isVerified) throw new BadRequestError('User account in not verified. Please verify your account')

    return next()
  },

  validatePassword: async (req, res, next) => {
    const confirmPassword = await bcrypt.compare(req.body.password, req.user.password)

    if (!confirmPassword) throw new BadRequestError('Invalid Email or Password')

    return next()
  },

  getJWTToken: async (req, res, next) => {
    const jwtToken = await jwt.sign(
      {
        user_id: req.user._id,
        email: req.user.email,
        todolist_id: req.user.todolist._id
      }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' })

    req.jwtToken = jwtToken

    return next()
  }
}

module.exports = UserController
