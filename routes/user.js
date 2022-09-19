const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const Validator = require('../validators/user-validator')
const handleValidator = require('../middleware/run-validator')
const UserController = require('../controllers/user')
const { BadRequestError } = require('../errors')
const sendEmail = require('../services/email/email-service')
const bcrypt = require('bcrypt')
const JwtAuth = require('../middleware/jwt-auth')
require('express-async-errors')

router.post('/signup',
  UserController.checkIfUserAlreadyExists,
  UserController.getUserVerificationData,
  Validator.validateNewUser(),
  handleValidator,
  UserController.createNewUser,
  UserController.sendVerificationEmail,
  (req, res) => res.send(`User with email ${req.body.email} has been created`))

router.post('/verify',
  Validator.validateEmailAndVerification(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.checkIfUserVerified,
  UserController.checkVerificationIat,
  UserController.verifyUser,
  (req, res) => res.send(`User ${req.user.email} has been verified`))

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
