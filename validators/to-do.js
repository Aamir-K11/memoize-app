const { BadRequestError } = require('../errors')
const ToDoValidatorSchema = require('./validator-schemas/to-do')

const validateNewToDoInput = (verifyUserInput) => {
  const { error } = ToDoValidatorSchema.newToDoInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validateUpdateToDoInput = (verifyUserInput) => {
  const { error } = ToDoValidatorSchema.updateToDoInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

const validateDeleteToDoInput = (verifyUserInput) => {
  const { error } = ToDoValidatorSchema.deleteToDoInputSchema.validate(verifyUserInput)

  if (error) throw new BadRequestError([...error.details.map((v) => v.message)])
}

module.exports = {
  validateNewToDoInput,
  validateUpdateToDoInput,
  validateDeleteToDoInput
}
