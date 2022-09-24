const UserService = require('../services/user')
require('express-async-errors')

const signUp = async (req, res) => {
  await UserService.signUp(req.body)

  return res.send(`User with email ${req.body.email} has been created`)
}

const verify = async (req, res) => {
  await UserService.verify(req.body.email, req.body.verificationCode)

  return res.send(`User with email ${req.body.email} has been verified`)
}

const verificationCode = async (req, res) => {
  await UserService.verificationCode(req.body.email, req.body.password)

  return res.send(`Verification data is sent to the user at ${req.body.email}`)
}

const changePassword = async (req, res) => {
  await UserService.changePassword(req.body.email, req.body.newPassword)

  return res.send(`User ${req.body.email} password has been changed`)
}

const login = async (req, res) => {
  const jwtToken = await UserService.login(req.body.email, req.body.password)

  return res.send(jwtToken)
}

module.exports = {
  signUp,
  verify,
  verificationCode,
  changePassword,
  login
}
