const authenticateToken = require('../middleware/tokenAuthenticate')
const express = require('express')
const router = express.Router()
const db = require('../db/mongo')
const userSchema = require('../model/user_model')/* GET home page. */
const userModel = db.model('user', userSchema)

/* GET all folder. */
router.get('/', authenticateToken, async (req, res) => {
  const current_user = await userModel.findOne({_id: req.user.userId})
  let snippets;
  if (current_user.user_type === "admin"){
      userModel.find({}, (err, data) => {
          if (err) {
              res.status(500).send({"error": err})
          }
          else{
          const folders = [].concat(...data.map((e) => e.folders))

          snippets = [].concat(...folders.map((e) => e.snippets))
          res.send(snippets)
          }
      })
  }
  else{
      res.send(current_user.folders)
  }
});

module.exports = router
