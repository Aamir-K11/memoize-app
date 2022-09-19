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

    req.body.user = user
    return next()
  },

  checkIfUserAlreadyExists: async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser) throw new BadRequestError('Email already associated with a user')

    return next()
  },

  createNewUser: async (req, res, next) => {
    const { firstname, lastname, email, password, verificationCode, verificationIat } = req.body
    const newUser = { firstname, lastname, email, password, verificationCode, verificationIat }
    newUser.todolist = await ToDoList.create({})

    await User.create(newUser)

    return next()
  },

  sendVerificationEmail: async (req, res, next) => {
    await sendEmail({
      from: process.env.EMAIL_USER,
      sender: 'no-reply@memoize.com',
      subject: 'User Verification Code',
      to: req.body.email,
      text: `The verification code is: ${req.body.verificationCode}`
    })
  },

  verifyUser: async (req, res, next) => {
    const updateRes = await User.updateOne({ email: req.body.email }, { isVerified: true, verificationCode: '', verificationIat: 0 })

    if (updateRes.modifiedCount == 0) return res.send('Failed to verify user. Please try again later')
  },

  checkVerificationIat: async (req, res, next) => {
    const newVerificationIat = Math.floor(new Date().getTime() / 1000)

    const userVerificationIat = req.body.user.verificationIat

    if (newVerificationIat - userVerificationIat > 600) throw new BadRequestError('Verification code is expired')

    if (req.body.user.enteredverificationCode !== req.body.verificationCode) throw new BadRequestError('Invalid verification code')
  },

  checkIfUserUnverified: async (req, res, next) => {
    if (!req.body.user.isVerified) throw new BadRequestError('User account in not verified. Please verify your account')

    return next()
  },

  checkIfUserVerified: async (req, res, next) => {
    if (req.body.user.isVerified) throw new BadRequestError('User is already verified')

    return next()
  },

  validatePassword: async (req, res, next) => {
    const confirmPassword = await bcrypt.compare(req.body.password, req.body.user.password)

    if (!confirmPassword) throw new BadRequestError('Invalid Email or Password')

    return next()
  },

  getJWTToken: async (req, res, next) => {
    const jwtToken = await jwt.sign(
      {
        user_id: req.body.user._id,
        email: req.body.user.email,
        todolist_id: req.body.user.todolist._id
      }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' })

    req.jwtToken = jwtToken

    return next()
  },

  getUserVerificationData: async (req, res, next) => {
    req.body.user.verificationCode = Math.random().toString(36).slice(2)
    req.body.user.verificationIat = Math.floor(new Date().getTime() / 1000)

    return next()
  }
}

module.exports = UserController
