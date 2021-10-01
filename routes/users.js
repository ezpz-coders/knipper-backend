var authenticateToken = require('../middleware/tokenAuthenticate')
var express = require('express');
var router = express.Router();
var generateAccessToken = require('../middleware/generateToken')
const db = require("../db/mongo");
const userSchema = require("../model/user_model");


// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

var userModel = db.model("userModel", userSchema);

router.post('/api/signup', (req, res) => {

  /*
   TODO : register user in mongodb if it doesn't exist
   res => user details, jwt
   
  */  
  const token = generateAccessToken({ username: req.body.username });

  userModel.create({"user_name": req.body.username, "email": req.body.email, "password": req.body.password}, (err, data) =>{

    if (err) {console.error(err);}

  })
  res.json({"auth-token": token});

});

router.get('/api/me', authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
  res.status(200).send('Access Granted!');
})

module.exports = router;
