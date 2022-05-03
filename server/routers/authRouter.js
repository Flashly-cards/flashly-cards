const express = require('express');
const router = express.Router();

// import in controllers
const authController = require('../controllers/authController');

router.post('/addUser', authController.checkRegister, authController.addUser, (req, res) => {
  console.log('successfully created user');
  // send the created user info to front end
  res.status(200).json(res.locals.newUser);
})


module.exports = router;