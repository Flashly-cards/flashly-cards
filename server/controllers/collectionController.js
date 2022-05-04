const { Collections } = require('../models/Models');

const collectionController = {};

collectionController.createCollection = (req, res, next) => {
  // let { userId, collectionName } = req.body;
  let userId = req.body.userId;
  let collectionName = req.body.collectionName;
  if (userId === undefined) {
    collectionName = 'Uncategorized';
    userId = res.locals.newUser['_id'];
  }
  const queryObject = { userId, collectionName }; 
  Collections.create(
    queryObject,
    (err, newCollection) => {
      if (err) {
        next({
          log: 'collectionController.createCollection ERROR: cannot create the collection',
          status: 400,
          message: {err: 'error creating the collection'}
        })
      } else {
        console.log('newcollection: ', newCollection);
        console.log('newCollection ID: ', newCollection.userId)
        // deconstruct the newCollection to make userID a string (currently array)
        res.locals.data = newCollection;
        next();
      }
    }
  )
}





module.exports = collectionController;