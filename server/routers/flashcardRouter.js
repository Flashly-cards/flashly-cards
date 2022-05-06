const express = require('express');
const router = express.Router();

// import in controllers
const flashcardController = require('../controllers/flashcardController');
const collectionController = require('../controllers/collectionController');

router.post(
  '/getCards', 
  flashcardController.getcards, 
  (req, res) => {
    console.log('successfully gotten all cards based on user id & collection id');
    // send all of the cards (array of objects) to the front end
    res.status(200).json(res.locals.data);
  }
)

router.post(
  '/newcard', 
  flashcardController.newcard, 
  collectionController.findCollection,
  collectionController.addCardToCollection,
  (req, res) => {
    console.log('successfully created new card');
    // send all of the cards (array of objects) to the front end
    res.status(200).json(res.locals.updatedCollection);
  }
)

// router.post(
//   '/editcard',
//    flashcardController.editcard,
//   (req, res) => {
//     console.log('successfully edited new card');
//   res.status(200).json(res.locals.data);
//   }
// )

// router.post(
//   '/removecard',
//    flashcardController.removecard,
//   (req, res) => {
//     console.log('successfully removed new card');
//   res.status(200).json(res.locals.data);
//   }
// )

// router.post(
//   '/deletecard',
//    flashcardController.delete,
//   (req, res) => {
//     console.log('successfully deleted new card');
//   res.status(200).json(res.locals.data);
//   }
// )


module.exports = router;