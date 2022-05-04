const { Collections } = require('../models/Models');

const collectionController = {};

collectionController.createCollection = (req, res, next) => {
  const { userId, collectionName } = req.body;
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
        res.locals.data = newCollection;
        next();
      }
    }
  )
}





module.exports = collectionController;