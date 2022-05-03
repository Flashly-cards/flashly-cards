const { Users } = require('../models/Models');

const authController = {};

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
      res.locals.newUser['_id'] = createdUser._id;
      console.log('res.locals.newUser: ', res.locals.newUser);
      return next();
    }
  )
}

module.exports = authController;