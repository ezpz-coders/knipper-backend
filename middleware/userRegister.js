const bcrypt = require('bcryptjs')
const generateAccessToken = require('./generateToken')
const db = require('../db/mongo')
const userSchema = require('../model/user_model')
const User = db.model('User', userSchema)
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const { nanoid } = require('nanoid')
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @description registers a user in mongoDB and returns a jwt token
 */
exports.userRegister = async (req, res, next) => {
  const { email, user_name, password } = req.body
  try {
    const usernameExists = await User.findOne({ user_name })
    if (usernameExists) {
      throw new Error('User with that username already exists')
    }
    const alreadyExists = await User.exists({ email: email.toLowerCase() })
    if (alreadyExists) throw new Error('user with that email already exists')

    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({
      email: email.toLowerCase(),
      user_name: user_name.toLowerCase(),
      password: hash,
      referrer: nanoid(6)
    })
    const savedUser = await newUser.save()
    const token = generateAccessToken(newUser)
    return res.status(201).json({ auth_token: token })
  } catch (err) {
    if (err)
      return res.status(400).json({ success: false, message: err.message })
    console.error(err)
    return res.status(500).send('Something unexpected occurred')
  }
}
