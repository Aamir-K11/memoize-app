const { validationResult } = require('express-validator')
const { BadRequestError } = require('../errors')

module.exports = async (req, res, next) => {
  const errorFormatter = ({ location, msg, param }) => {
    return `${location}[${param}]: ${msg}`
  }

  const result = validationResult(req).formatWith(errorFormatter)
  if (!result.isEmpty()) {
    throw new BadRequestError(result.array())
  }

  return next()
}
