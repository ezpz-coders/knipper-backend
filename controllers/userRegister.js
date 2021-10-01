const bcrypt = require('bcryptjs')
const generateAccessToken = require('../middleware/generateToken')
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
  const { email, userName, password } = req.body
  try {
    const alreadyExists = await User.exists({ email: email.toLowerCase() })
    if (alreadyExists) return res.status(401).send('Email already exists')

    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({
      email: email.toLowerCase(),
      userName,
      password: hash,
      referrer: nanoid(6)
    })
    const savedUser = await newUser.save()
    const token = generateAccessToken(newUser)
    return res.status(201).json({ auth_token: token })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Something unexpected occurred')
  }
}
