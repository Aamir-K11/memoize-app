const express = require('express')
const router = express.Router()
const Validator = require('../validators/user')
const handleValidator = require('../middleware/run-validator')
const UserController = require('../controllers/user')
const JwtAuth = require('../middleware/jwt-auth')
require('express-async-errors')

router.post('/signup',
  UserController.checkIfUserAlreadyExists,
  UserController.getUserVerificationData,
  Validator.validateNewUser(),
  handleValidator,
  UserController.createNewUser,
  UserController.sendVerificationEmail,
  async (req, res) => res.send(`User with email ${req.body.email} has been created`))

router.post('/verify',
  Validator.validateEmailAndVerification(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.checkIfUserVerified,
  UserController.checkVerificationIat,
  UserController.verifyUser,
  (req, res) => res.send(`User ${req.body.email} has been verified`))

router.post('/verificationcode',
  Validator.validateEmailAndPassword(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.validatePassword,
  UserController.getUserVerificationData,
  UserController.updateUserVerificationData,
  UserController.sendVerificationEmail,
  async (req, res) => {
    return res.send('New verification code has been sent on your Email')
  })

router.post('/changepassword',
  JwtAuth,
  Validator.validateNewPassword(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.changePassword,
  async (req, res) => {
    return res.send('User\'s password has been changed')
  })

module.exports = router
