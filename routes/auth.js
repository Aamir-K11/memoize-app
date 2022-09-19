const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const Validators = require('../validators/user-validator')
const handleValidator = require('../middleware/run-validator')

router.post('/login',
  Validators.validateEmailAndPassword(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.ifUserVerified,
  UserController.validatePassword,
  UserController.getJWTToken,
  async (req, res) => {
    return res.send(req.jwtToken)
  })

module.exports = router
