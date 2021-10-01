const { emailValidate, passwordValidate } = require('../utils/validation')
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @returns response if failed otherwise goes on to next middleware
 */
exports.initialValidation = (req, res, next) => {
  const { email, password, confirmPassword } = req.body
  if (
    typeof email === 'string' &&
    typeof password === 'string' &&
    typeof confirmPassword === 'string' &&
    email.length > 0 &&
    password.length > 8 &&
    confirmPassword === password &&
    emailValidate(email) &&
    passwordValidate(password)
  ) {
    next()
  } else res.status(401).send('Initial checks fail')
}
