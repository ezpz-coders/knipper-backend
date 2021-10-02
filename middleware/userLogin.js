const bcrypt = require('bcryptjs');
const generateAccessToken = require('./generateToken');
const db = require('../db/mongo');
const userSchema = require('../model/user_model');
const CustomError = require('../utils/CustomError');

const User = db.model('User', userSchema);

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').next} next
 * @description returns token on success
 *
 */
exports.userLogin = async (req, res) => {
  try {
    const { loginDetails, password } = req.body;
    if (!loginDetails || !password) throw new CustomError(402, 'Bad Request');
    const user = await User.find({
      $or: [
        { user_name: loginDetails.toLowerCase() },
        { email: loginDetails.toLowerCase() },
      ],
    });
    if (!user[0]) throw new CustomError(402, 'Invalid Login Credentials');
    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);
    if (isPasswordCorrect) {
      const token = generateAccessToken(user[0]);
      return res.status(200).json({ success: true, auth_token: token });
    }
    throw new CustomError(402, 'Invalid Login Credentials');
  } catch (err) {
    if (err) {
      return res
        .status(err.httpStatusCode)
        .json({ success: false, message: err.message });
    }
    return res.status(500).send('Internal Server error');
  }
};
