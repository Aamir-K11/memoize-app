const { BadRequestError } = require('../errors')
const UserValidatorSchema = require('./validator-schemas/user')

const validateNewUserInput = (verifyUserInput) => {
  const { error } = UserValidatorSchema.newUserInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validateVerifyUserInput = (verifyUserInput) => {
  const { error } = UserValidatorSchema.verifyUserInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validateverificationCodeInput = (verifyUserInput) => {
  const { error } = UserValidatorSchema.verificationCodeInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validatechangePasswordInput = (verifyUserInput) => {
  const { error } = UserValidatorSchema.changePasswordInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validateLoginInput = (verifyUserInput) => {
  const { error } = UserValidatorSchema.loginInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

module.exports = {
  validateNewUserInput,
  validateVerifyUserInput,
  validateverificationCodeInput,
  validatechangePasswordInput,
  validateLoginInput
}
