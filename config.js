const dotenv = require('dotenv');

// get config vars
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
};
