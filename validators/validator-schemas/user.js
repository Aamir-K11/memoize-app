const Joi = require('joi')

const newUserInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
    .required(),

  password: Joi.string()
    .min(8)
    .required(),

  firstname: Joi.string()
    .min(3)
    .max(30)
    .required(),

  lastname: Joi.string()
    .min(3)
    .max(30)
    .required()
})

const verifyUserInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
    .required(),

  verificationCode: Joi.string()
    .required()
})

const verificationCodeInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
    .required(),

  password: Joi.string()
    .min(8)
    .required()
})

const changePasswordInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
    .required(),

  newPassword: Joi.string()
    .min(8)
    .required()
})

const loginInputSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } })
    .required(),

  password: Joi.string()
    .min(8)
    .required()
})

module.exports = {
  newUserInputSchema,
  verifyUserInputSchema,
  verificationCodeInputSchema,
  changePasswordInputSchema,
  loginInputSchema
}
