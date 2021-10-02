const bcrypt = require('bcryptjs');
const generateAccessToken = require('./generateToken');
const db = require('../db/mongo');
const userSchema = require('../model/user_model');
const User = db.model('User', userSchema);
const CustomError = require('../utils/CustomError');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @description registers a user in mongoDB and returns a jwt token
 */
exports.userRegister = async (req, res) => {
  const { email, user_name, password } = req.body;
  try {
    const usernameExists = await User.findOne({ user_name });
    if (usernameExists) {
      throw new CustomError(402, 'User already exists');
    }
    const alreadyExists = await User.exists({ email: email.toLowerCase() });
    if (alreadyExists) throw new CustomError(402, 'User already exists');

    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email: email.toLowerCase(),
      user_name: user_name.toLowerCase(),
      password: hash,
    });
    const savedUser = await newUser.save();
    const token = generateAccessToken(savedUser);
    return res.status(201).json({ auth_token: token });
  } catch (err) {
    if (err)
      return res
        .status(err.httpStatusCode)
        .json({ success: false, message: err.message });
    return res.status(500).send('Something unexpected occurred');
  }
};
