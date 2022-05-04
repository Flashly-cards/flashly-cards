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
  const cards = [];
  const queryObject = { userId, collectionName, cards }; 
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
        // deconstruct the newCollection to make userID a string (currently array)
        // res.locals.newUser['cards'] = newCollection; // we dont need to store the collection in user document
        res.locals.data = newCollection;
        next();
      }
    }
  )
}
 

collectionController.findCollection = (req, res, next) => {
  // this is so we can grab the current cards array that exists in this collection id

  // deconstruct varaibles from previous middleware func
  const { createdCard } = res.locals.data;
  const { collectionId } = req.body;

  const queryObject = { _id: collectionId }; 
  let targetCollection;

  Collections.findOne(
    queryObject, 
    (err, foundCollection) => {
      if (err) {
        console.log("we are getting an error")
        return next({
          log: `authController.getCollections ERROR: ${err}`,
          status: 400,
          message: {err: `unable to retrieve user's collections`}
        })
      }
      targetCollection = foundCollection;
      targetCollection.cards.push(createdCard);
      res.locals['targetCollection'] = targetCollection;
      return next();
    }
  )
}

collectionController.addCardToCollection = (req, res, next) => {
  // this is so we can update collection from previous middleware func
  const { collectionId } = req.body;
  const queryObject = { _id: collectionId }; 

  const updatedCardsArray = res.locals['targetCollection']['cards'];
  const update = { cards: updatedCardsArray };

  Collections.findOneAndUpdate(
    queryObject,
    update,
    // we want to return the updated card (code below)
    {new: true},
    (err, updatedCollection) => {
      if (err) {
        return (next({
          log: 'collectionController.addCardToCollection ERROR: cannot find or update the specific collection',
          status: 400,
          message: {err: 'error adding card to collection'}
        }))
      } else {
        res.locals['updatedCollection'] = updatedCollection;
        return next();
      }
    }
  )
}


module.exports = collectionController;