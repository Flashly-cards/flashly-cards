const { Collection } = require('mongoose');
const { Flashcards, Collections } = require('../models/Models');

const flashcardController = {};


// flashcardController.checkrequest = (req, res, next) => {
//   // check that all inputs are received
  
// };

flashcardController.getcards = (req, res, next) => {
  // check inputs, add this functionality after
  const { userId, collectionId } = req.body;
  const queryObject = { userId, collectionId }
  Flashcards.findAll(
    queryObject,
    (err, cards) => {
      if (err) {
        return (next({
          log: 'flashcardController.getcards ERROR: cannot get the cards based on userId and collectionId',
          status: 400,
          message: {err: 'error getting all cards from target collection'}
        }))
      } else {
        res.locals.data = cards;
      }
    }
  ).then(() => {
    return next();
  })
};

flashcardController.newcard = (req, res, next) => {
  const { userId, collectionId, frontText, backText } = req.body;
  // add logic for if a collection Id isnt provided (need to give it the "Uncategorized" collection Id)
  const queryObject = { userId: userId, collectionId: collectionId, frontText: frontText, backText: backText };
  res.locals.data = {};
  Flashcards.create(
    queryObject,
    (err, createdCard) => {
      if (err) {
        console.log("error: ", err);
        return (next({
          log: 'flashcardController.newcard ERROR: cannot create the specified card',
          status: 400,
          message: {err: 'error creating the card'}
        }))
      } else {
        res.locals.data['createdCard'] = createdCard;
        return next();
      }
    }
  )
};

// flashcardController.editcard = (req, res, next) => {
// const { userId, cardId, frontText, answer} = req.body;
// const queryObject = { cardId, frontText: question, backText: answer };
// const update = { frontText: question, backText: answer}
// Flashcards.findOneAndUpdate(
  // queryObject, update
//   (err, cards) => {
//     if (err) {
//       return (next({
//         log: 'flashcardController.removecard ERROR: card does not exist,
//         status: 400,
//         message: {err: 'error removing card'}
//       }))
//     } else {
//       res.locals.data = cards;
//       console.log("card edited from flashcardController.editcard: ", cards);
//     }
//   }
// ).then(() => {
//   return next();
// })
// };


// flashcardController.removecard = (req, res, next) => {
// const { userId, collectionId, cardId } = req.body;
// const queryObject = { collectionId, cardId };
// Flashcards.remove(
  // queryObject,
//   (err, cards) => {
//     if (err) {
//       return (next({
//         log: 'flashcardController.removecard ERROR: card does not exist,
//         status: 400,
//         message: {err: 'error removing card'}
//       }))
//     } else {
//       res.locals.data = cards;
//       console.log("card removed from flashcardController.removecard: ", cards);
//     }
//   }
// ).then(() => {
//   return next();
// })
// };



// flashcardController.deletecard = (req, res, next) => {
// const { userId, collectionId } = req.body;
// const queryObject = { cardId, collectionId }
// const delete = { cardId, collectionId }
// Flashcards.deleteOne(
//   queryObject, delete,
//   (err, cards) => {
//     if (err) {
//       return (next({
//         log: 'flashcardController.deletecard ERROR: card does not exist,
//         status: 400,
//         message: {err: 'error deleting card'}
//       }))
//     } else {
//       res.locals.data = cards;
//       console.log("card deleted from flashcardController.deletecard: ", cards);
//     }
//   }
// ).then(() => {
//   return next();
// })
// };



module.exports = flashcardController;

