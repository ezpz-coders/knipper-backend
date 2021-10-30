const authenticateToken = require('../middleware/tokenAuthenticate');
const express = require('express');
const router = express.Router();
const db = require('../db/mongo');
const userSchema = require('../model/user_model');
const folderSchema = require('../model/folder_model');
const { initialValidation } = require('../middleware/initialValidation');
const { userRegister } = require('../middleware/userRegister');
const { userLogin } = require('../middleware/userLogin');

const userModel = db.model('user', userSchema);
const folderModel = db.model('folder', folderSchema);

const userModel = db.model('user', userSchema);
/* GET all folder. */
router.get('/', authenticateToken, async (req, res, next) => {
  const current_user = await userModel.findOne({ _id: req.user.userId });
  let folders;
  if (current_user.user_type === 'admin') {
    userModel.find({}, (err, data) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        folders = [].concat(...data.map((e) => e.folders));
        res.send(folders);
      }
    });
  } else {
    res.send(current_user.folders);
  }
});

module.exports = router;
