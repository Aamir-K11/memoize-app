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

module.exports = {
  newToDoInputSchema
}
