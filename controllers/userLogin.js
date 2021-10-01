const bcrypt = require('bcryptjs')
const generateAccessToken = require('../middleware/generateToken')
const db = require('../db/mongo')
const userSchema = require('../model/user_model')

const User = db.model('User', userSchema)

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @description returns token on success
 *
 */
exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    console.log(user)
    if (!user) throw new Error(`User doesn't exist`)
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (isPasswordCorrect) {
      const token = generateAccessToken(user)
      return res.status(200).send({ success: true, auth_token: token })
    } else {
      throw new Error('Incorrect Password')
    }
  } catch (err) {
    if (err) {
      return res.status(401).json({ success: false, message: err.message })
    } else return res.status(500).send('Internal Server error')
  }
}
