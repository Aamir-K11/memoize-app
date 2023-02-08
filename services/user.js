const UserDBService = require('../db-services/user')
const { BadRequestError, InternalServerError } = require('../errors')
const UserValidator = require('../validators/user')
const sendEmail = require('./email/email-service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getVerificationData = () => [Math.random().toString(36).slice(2), Math.floor(new Date().getTime() / 1000)]

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    await sendEmail({
      from: process.env.EMAIL_USER,
      sender: 'no-reply@memoize.com',
      subject: 'User Verification Code',
      to: email,
      text: `The verification code is: ${verificationCode}`
    })
  } catch (e) {
    throw new InternalServerError('Email service is down!')
  }
}
const checkVerificationIat = (receivedVerificationCode, userVerificationIat, userVerificationCode) => {
  const newVerificationIat = Math.floor(new Date().getTime() / 1000)

  if (newVerificationIat - userVerificationIat > 600) throw new BadRequestError('Verification code is expired')

  if (userVerificationCode !== receivedVerificationCode) throw new BadRequestError('Invalid verification code')
}

const validatePassword = async (receivedPassword, userPassword) => {
  const confirmPassword = await bcrypt.compare(receivedPassword, userPassword)

  if (!confirmPassword) throw new BadRequestError('Invalid Password')
}

const getJWTToken = async ({ _id, email, todolist }) => {
  const jwtToken = await jwt.sign(
    {
      _id,
      email,
      todolist
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' })

  return jwtToken
}

const signUp = async (newUser) => {
  UserValidator.validateNewUserInput(newUser)

  const existingUser = await UserDBService.findUserByEmail(newUser.email)

  if (existingUser) throw new BadRequestError('Email already associated with a user')

  const [verificationCode, verificationIat] = getVerificationData()

  newUser.verificationCode = verificationCode
  newUser.verificationIat = verificationIat

  await UserDBService.createNewUser(newUser)

  await sendVerificationEmail(newUser.email, verificationCode)
}

const verify = async (email, verificationCode) => {
  UserValidator.validateVerifyUserInput({ email, verificationCode })

  const existingUser = await UserDBService.findUserByEmail(email)

  if (!existingUser) throw new BadRequestError(`User with email ${email} doesnot exist`)

  if (existingUser.isVerified) throw new BadRequestError(`User with email ${email} is already verified`)

  checkVerificationIat(verificationCode, existingUser.verificationIat, existingUser.verificationCode)

  const updateRes = await UserDBService.updateUser({ email }, { isVerified: true, verificationCode: '', verificationIat: 0 })

  if (updateRes.modifiedCount == 0) throw new BadRequestError('Failed to verify user. Please try again later')
}

const verificationCode = async (email, password) => {
  UserValidator.validateverificationCodeInput({ email, password })

  const existingUser = await UserDBService.findUserByEmail(email)

  if (!existingUser) throw new BadRequestError(`User with email ${email} doesnot exist`)

  await validatePassword(password, existingUser.password)

  const [verificationCode, verificationIat] = getVerificationData()

  const updateRes = await UserDBService.updateUser({ email }, { verificationCode, verificationIat })

  if (updateRes.modifiedCount == 0) throw new BadRequestError('Failed to verify user. Please try again later')

  await sendVerificationEmail(email, verificationCode)
}

const changePassword = async (email, newPassword) => {
  UserValidator.validatechangePasswordInput({ email, newPassword })

  const existingUser = await UserDBService.findUserByEmail(email)

  if (!existingUser) throw new BadRequestError(`User with email ${email} doesnot exist`)

  existingUser.password = newPassword

  await UserDBService.saveUser(existingUser)
}

const login = async (email, password) => {
  UserValidator.validateLoginInput({ email, password })

  const existingUser = await UserDBService.findUserByEmail(email)

  if (!existingUser) throw new BadRequestError(`User with email ${email} doesnot exist`)

  if (!existingUser.isVerified) throw new BadRequestError('User account in not verified. Please verify your account')

  await validatePassword(password, existingUser.password)

  const JWTtoken = await getJWTToken(existingUser)

  return {
    JWTtoken,
    firstname: existingUser.firstname,
    lastname: existingUser.lastname
  }
}

module.exports = {
  signUp,
  verify,
  verificationCode,
  changePassword,
  login,
  sendVerificationEmail
}
