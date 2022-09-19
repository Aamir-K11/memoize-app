const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const validateEmailAndPassword = require('../validators/user-validator')
const handleValidator = require('../middleware/run-validator')

router.post('/login',
  validateEmailAndPassword(),
  handleValidator,
  UserController.findUserByEmail,
  UserController.checkIfUserVerified,
  UserController.validatePassword,
  UserController.getJWTToken,
  async (req, res) => {
    return res.send(req.jwtToken)
  })

module.exports = router
