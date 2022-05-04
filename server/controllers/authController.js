const { Users, Collections } = require('../models/Models');
const bcrypt = require('bcrypt');

const authController = {};

authController.checkLogin = (req, res, next) => {
  const userProps = ['email', 'password'];
  res.locals.user = {};
  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: `authController.checkLogin ERROR: ${prop} property on request body undefined`,
        status: 400,
        message: {err: `${prop} required`}
      })
    }
    res.locals.user[prop] = req.body[prop];
  }
  return next();
}

authController.getHashedPass = (req, res, next) => {
  const { email } = res.locals.user;
  // Users.findOne({ 'email': email }).exec()
  // .then((userInfo) => {
  //   console.log("userInfo: ", userInfo)
  //   // if (err) {
  //   //   return next({
  //   //     log: `authController.getHashedPass ERROR: ${err}`,
  //   //     status: 400,
  //   //     message: {err: `unable to retrieve hashed password`}
  //   //   })
  //   // }
  //   res.locals.user.userId = userInfo._id;
  //   res.locals.user.username = userInfo.username;
  //   res.locals.user.hashedPass = userInfo.password;
  // })
  // .then(() => next());

  Users.findOne({ email: email }, (err, userInfo) => {
    if (err) {
      return next({
        log: `authController.getHashedPass ERROR: ${err}`,
        status: 400,
        message: {err: `unable to retrieve hashed password`}
      })
    }
    res.locals.user.userId = userInfo._id;
    res.locals.user.username = userInfo.username;
    res.locals.user.hashedPass = userInfo.password;
    return next();
  })
  // .then(() => next());
}

authController.comparePass = (req, res, next) => {
  const { password, hashedPass } = res.locals.user
  if (bcrypt.compareSync(password, hashedPass)) {
    res.locals.user.authorized = true;
    return next();
  } else {
    res.locals.user.authorized = false
    return next();
  }
}

authController.getCollections = (req, res, next) => {
  const { userId, authorized } = res.locals.user
  if (authorized === false) {
    return next();
  } else {
    Collections.find({ 'userId': userId }, (err, collections) => {
      if (err) {
        return next({
          log: `authController.getCollections ERROR: ${err}`,
          status: 400,
          message: {err: `unable to retrieve user's collections`}
        })
      }
      res.locals.user.hashedPass = '';
      res.locals.user.password = '';
      res.locals.user.collections = collections;
      return next();
    });
  }
}

authController.checkRegister = (req, res, next) => {
  const userProps = ['username', 'email', 'password'];
  res.locals.newUser = {};
  // grab user input for new user
  // make sure none of required fields are empty
  for (const prop of userProps) {
    // if any are empty, error out
    if (!req.body[prop]) {
      return next({
        log: `authController.checkRegister ERROR: ${prop} property on request body undefined`,
        status: 400,
        message: {err: `${prop} required`}
      })
    }
    res.locals.newUser[prop] = req.body[prop];
  }
  return next();
}

authController.hashPass = (req, res, next) => {
  const { password } = res.locals.newUser;
  const rounds = 10;
  const hashedPass = bcrypt.hashSync(password, rounds);
  res.locals.newUser.password = hashedPass;
  return next();
}

authController.addUser = (req, res, next) => {
  const { email, username, password } = res.locals.newUser;
  Users.create(
    { email, username, password },
    (err, createdUser) => {
      if (err) {
        return next({
          log: `authController.addUser ERROR: cannot add user to the database`,
          status: 400,
          message: {err: `error adding user to database`}
        })
      };
      res.locals.newUser.password = '';
      res.locals.newUser['_id'] = createdUser._id;
      console.log('res.locals.newUser: ', res.locals.newUser);
      return next();
    }
  )
}

module.exports = authController;