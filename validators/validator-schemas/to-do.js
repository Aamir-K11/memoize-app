const Joi = require('joi')

const newToDoInputSchema = Joi.object({
  title: Joi.string()
    .required(),

  description: Joi.string()
    .max(100),

  priority: Joi.string()
    .uppercase()
}
)

const updateToDoInputSchema = Joi.object({
  toDoId: Joi.string()
    .required(),

  title: Joi.string()
    .required(),

  description: Joi.string()
    .max(100),

  priority: Joi.string()
    .uppercase()
}
)

module.exports = {
  newToDoInputSchema,
  updateToDoInputSchema
}
