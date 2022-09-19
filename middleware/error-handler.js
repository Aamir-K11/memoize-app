module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 500
  err.message = err.message || 'Internal Server error'

  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: [err.message]
  })
}
