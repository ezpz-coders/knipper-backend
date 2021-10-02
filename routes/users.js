var authenticateToken = require('../middleware/tokenAuthenticate')
var express = require('express')
var router = express.Router()
const db = require('../db/mongo')
const userSchema = require('../model/user_model')
const { initialValidation } = require('../middleware/initialValidation')
const { userRegister } = require('../middleware/userRegister')
const { userLogin } = require('../middleware/userLogin')

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

var userModel = db.model('user', userSchema)

router.post('/signup', initialValidation, userRegister)
router.post('/signin', userLogin)

router.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Access Granted' })
})

router.post('/me/add-snippet', (req, res, next) => {
  const body = req.body
  userModel.create(body, (err, data) => {
    console.log('added')
  })
  res.status(201).json(body)
})

module.exports = router
