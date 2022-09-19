const User = require('../schemas/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const sendEmail = require('../services/email/email-service')
const { ToDoList } = require('../schemas/to-do-list')
require('express-async-errors')
require('dotenv').config()

const UserController = {
  findUserByEmail: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) throw new BadRequestError('Invalid Email or Password')

    req.user = user
    return next()
  },

  ifUserAlreadyExists: async (req, res, next) => {
    if (req.user) throw new BadRequestError('Email already associated with a user')

    return next()
  },

  createNewUser: async (req, res, next) => {
    req.user.todolist = await ToDoList.create({})

    req.user = await User.create(req.user)

    return next()
  },

  sendVerificationEmail: async (req, res, next) => {
    await sendEmail({
      from: process.env.EMAIL_USER,
      sender: 'no-reply@memoize.com',
      subject: 'User Verification Code',
      to: req.user.email,
      text: `The verification code is: ${req.user.verificationCode}`
    })
  },

  ifUserVerified: async (req, res, next) => {
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
  },

  getUserVerificationData: async (req, res, next) => {
    req.user.verificationCode = Math.random().toString(36).slice(2)
    req.user.verificationIat = Math.floor(new Date().getTime() / 1000)

    return next()
  }
}

module.exports = UserController
