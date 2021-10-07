var authenticateToken = require('../middleware/tokenAuthenticate')
var express = require('express')
var router = express.Router()
const db = require('../db/mongo')
const userSchema = require('../model/user_model')
const folderSchema = require('../model/folder_model')
const { initialValidation } = require('../middleware/initialValidation')
const { userRegister } = require('../middleware/userRegister')
const { userLogin } = require('../middleware/userLogin')


var userModel = db.model('user', userSchema)
var folderModel = db.model('folder', folderSchema)

/* GET all folder. */
router.get('/', authenticateToken, async function (req, res, next) {
  let current_user = await userModel.findOne({_id: req.user.userId})
  let folders;
  if (current_user.user_type === "admin"){
      userModel.find({}, (err, data) => {
          if (err) {
              res.status(500).send({"error": err})
          }
          else{
          folders = [].concat(...data.map((e) => {
              return e.folders
          }))
          res.send(folders)
          }
      })
  }
  else{
      res.send(current_user.folders)
  }
});


module.exports = router