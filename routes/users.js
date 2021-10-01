var authenticateToken = require('../middleware/tokenAuthenticate')
var express = require('express')
var router = express.Router()
const db = require('../db/mongo')
const userSchema = require('../model/user_model')
const { initialValidation } = require('../middleware/initialValidation')
const { userRegister } = require('../controllers/userRegister')
const { userLogin } = require('../controllers/userLogin')

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

var userModel = db.model('userModel', userSchema)

router.post('/api/signup', initialValidation, userRegister)
router.post('/api/signin', userLogin)

router.get('/api/me', authenticateToken, (req, res) => {
  res.status(200).json({success:true,message:"Access Granted"})
})

module.exports = router
