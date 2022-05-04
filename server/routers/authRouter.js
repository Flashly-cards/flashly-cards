const express = require('express');
const router = express.Router();

// import in controllers
const authController = require('../controllers/authController');

//login user route
router.post('/',
  authController.checkLogin,
  authController.getHashedPass,
  authController.comparePass,
  authController.getCollections,
  (req, res,) => {
    res.status(200).json(res.locals.user);
  }
)

router.post('/addUser', authController.checkRegister, authController.hashPass, authController.addUser, (req, res) => {
  console.log('successfully created user');
  // send the created user info to front end
  res.status(200).json(res.locals.newUser);
})

module.exports = router;