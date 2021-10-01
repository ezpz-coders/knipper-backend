var authenticateToken = require('../middleware/tokenAuthenticate')
var express = require('express');
var router = express.Router();
var generateAccessToken = require('../middleware/generateToken')

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/api/createNewUser', (req, res) => {
  // ...

  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

  // ...
});

router.get('/api/userOrders', authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
  res.status(200).send('lmao agya tu');
})

module.exports = router;
