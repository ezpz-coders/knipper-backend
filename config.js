const dotenv = require('dotenv');

// get config vars
dotenv.config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET
}
