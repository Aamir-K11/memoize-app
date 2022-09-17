const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const { BadRequestError } = require('../errors')
const { ToDoList } = require('../schemas/to-do-list')
const sendEmail = require('../services/email/email-service')
const bcrypt = require('bcrypt')
const JwtAuth = require('../middleware/jwt-auth')
require('express-async-errors')

router.post('/signup', async (req, res) => {
  const newUser =
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          verificationCode: Math.random().toString(36).slice(2),
          verificationIat: Math.floor(new Date().getTime() / 1000)
        }

  const existingUser = await User.findOne({ email: newUser.email })

  if (existingUser) throw new BadRequestError('Email already associated with a user')

  newUser.todolist = await ToDoList.create({})

  const createdUser = await User.create(newUser)

  await sendEmail({
    from: process.env.EMAIL_USER,
    sender: 'no-reply@memoize.com',
    to: createdUser.email,
    text: `The verification code is: ${createdUser.verificationCode}`
  })

  return res.send(`User with email ${createdUser.email} has been created`)
})

router.post('/verify', async (req, res) => {
  const { email, verificationCode } = req.body

  if (!email && !verificationCode) throw new BadRequestError('Email or verificationCode is missing')

  const existingUser = await User.findOne({ email })

  if (!existingUser) throw new BadRequestError('Invalid Email')

  if (existingUser.isVerified) throw new BadRequestError('User is already verified')

  const newVerificationIat = Math.floor(new Date().getTime() / 1000)

  const userVerificationIat = existingUser.verificationIat

  if (newVerificationIat - userVerificationIat > 600) throw new BadRequestError('Verification code is expired')

  if (verificationCode !== existingUser.verificationCode) throw new BadRequestError('Invalid verification code')

  const updateRes = await User.updateOne({ email }, { isVerified: true, verificationCode: '', verificationIat: 0 })

  if (updateRes.modifiedCount == 0) return res.send('Failed to verify user. Please try again later')

  return res.send('User has been verified')
})

router.post('/verificationcode', async (req, res) => {
  const { email, password } = req.body

  if (!email && !password) throw new BadRequestError('Email or Password is missing')

  const existingUser = await User.findOne({ email })

  if (!existingUser) throw new BadRequestError('User does not exist')

  const confirmPassword = await bcrypt.compare(password, existingUser.password)

  if (!confirmPassword) throw new BadRequestError('Invalid Email or Password')

  const verificationCode = Math.random().toString(36).slice(2)
  const verificationIat = Math.floor(new Date().getTime() / 1000)

  const updateRes = await User.updateOne({ email }, { verificationCode, verificationIat })

  if (updateRes.modifiedCount == 0) return res.send('Failed to generate new verification code. Please try again later')

  await sendEmail({
    from: process.env.EMAIL_USER,
    sender: 'no-reply@memoize.com',
    to: existingUser.email,
    text: `The verification code is: ${verificationCode}`
  })

  return res.send('New verification code has been sent on your Email')
})

router.post('/changepassword', [JwtAuth], async (req, res) => {
  const { newPassword } = req.body

  if (!newPassword) throw new BadRequestError('Please enter new password')

  const existingUser = await User.findOne({ email: req.user.email })

  if (!existingUser) throw new BadRequestError('User does not exist')

  existingUser.password = newPassword

  await existingUser.save()

  return res.send('User\'s password has been changed')
})

module.exports = router
