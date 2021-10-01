const jwt = require('jsonwebtoken');
const  { JWT_SECRET } = require('../config')

function generateAccessToken(username) {
    return jwt.sign(username, JWT_SECRET, { expiresIn: '1800s' });
}

module.exports = generateAccessToken;