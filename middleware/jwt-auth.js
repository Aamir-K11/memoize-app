const { UnauthorizedError } = require('../errors')
const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) throw new UnauthorizedError('A token is required for authentication')

  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    req.user = decoded
  } catch (error) {
    throw new UnauthorizedError('Login failed! Invalid token.')
  }

  return next()
}
