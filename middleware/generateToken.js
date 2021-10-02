const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

/**
 *
 * @param {Object} User Details about user fetched from database or created using mongoose
 * @returns jwt token in string format
 */
function generateAccessToken(User) {
  const JWT_VALIDITY = 1 * 24 * 60 * 60 * 1000
  const expireAt = Date.now() + JWT_VALIDITY
  return jwt.sign({ userId: User._id, expireAt }, JWT_SECRET)
}

module.exports = generateAccessToken
