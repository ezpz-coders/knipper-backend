const { emailValidate, passwordValidate, usernameValidate } = require('../utils/validation')
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @returns response if failed otherwise goes on to next middleware
 */
exports.initialValidation = (req, res, next) => {
  const { email, password, confirmPassword, user_name } = req.body
  if (
    typeof email === 'string' &&
    typeof user_name === 'string' &&
    typeof password === 'string' &&
    typeof confirmPassword === 'string' &&
    email.length > 0 &&
    password.length > 8 &&
    confirmPassword === password &&
    emailValidate(email) &&
    passwordValidate(password) &&
    usernameValidate(user_name)
  ) {
    next()
  } else res.status(401).send('Initial checks fail')
}
