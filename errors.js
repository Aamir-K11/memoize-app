class BadRequestError extends Error {
  constructor (message) {
    super(message)

    this.status = 'BadRequestException'
    this.statusCode = 400
  }
}

class UnauthorizedError extends Error {
  constructor (message) {
    super(message)

    this.status = 'UnauthorizedException'
    this.statusCode = 401
  }
}

class InternalServerError extends Error {
  constructor (message) {
    super(message)

    this.status = 'InternalServerError'
    this.statusCode = 500
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  InternalServerError
}
