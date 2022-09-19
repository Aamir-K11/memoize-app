const { body } = require('express-validator')

const validateEmailAndPassword = () => {
  return [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 8 })
  ]
}

module.exports = validateEmailAndPassword
