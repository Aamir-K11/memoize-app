const { body } = require('express-validator')

const Validators = {
  validateEmailAndPassword: () => {
    return [
      body('email').notEmpty().isEmail().normalizeEmail(),
      body('password').notEmpty().isLength({ min: 8 })
    ]
  },
  validateNewUser: () => {
    return [
      body('firstname').notEmpty(),
      body('lastname').notEmpty(),
      body('email').notEmpty().isEmail().normalizeEmail(),
      body('password').notEmpty().isLength({ min: 8 }),
      body('verificationCode').notEmpty(),
      body('verificationIat').notEmpty()
    ]
  },
  validateEmailAndVerification: () => {
    return [
      body('email').notEmpty().isEmail().normalizeEmail(),
      body('verificationCode').notEmpty()
    ]
  }
}

module.exports = Validators
