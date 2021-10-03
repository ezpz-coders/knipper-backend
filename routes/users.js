const authenticateToken = require('../middleware/tokenAuthenticate');
const express = require('express');
const router = express.Router();
const db = require('../db/mongo');
const userSchema = require('../model/user_model');
const { initialValidation } = require('../middleware/initialValidation');
const { userRegister } = require('../middleware/userRegister');
const { userLogin } = require('../middleware/userLogin');

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

const userModel = db.model('user', userSchema);

router.post('/signup', initialValidation, userRegister);
router.post('/signin', userLogin);

router.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Access Granted' });
});

router.post('/me/add-snippet', (req, res) => {
  const body = req.body;
  userModel.create(body, (err) => {
    if (err)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    console.log('added');
  });
  res.status(201).json(body);
});

module.exports = router;
