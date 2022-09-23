const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const JwtAuth = require('../middleware/jwt-auth')

require('express-async-errors')

router.post('/signup', UserController.signUp)

router.post('/verify', UserController.verify)

router.post('/verificationcode', UserController.verificationCode)

router.post('/changepassword', JwtAuth, UserController.changePassword)

module.exports = router
