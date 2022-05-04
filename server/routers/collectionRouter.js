const express = require ('express');
const router = express.Router();

const collectionController = require ('../controllers/collectionController');

router.post(
  '/newcollection',
  collectionController.createCollection,
  (req, res) => {
    console.log('successfully created collection');
    res.status(200).json(res.locals.data);
  }
)

/* 
new card in an existing collection (this middleware gets invoked when a new flashcard is created and needs to be added to an existing collection)

below is what is stored in res.locals after a new card is created (but before sent to front end)
  res.locals.data = createdCard;
  res.locals.nextChain.collectionId = collectionId;
  res.locals.nextChain._id = createdCard._id;



*/

// router.post(
//   '/editcollection',
//   collectionController.editCollection,
//   (req, res) => {
//     console.log('successfully edited collection');
//     res.status(200).json(res.locals.data);
//   }
// )

// router.post(
//   '/deletecollection',
//   collectionController.deleteCollection,
//   (req, res) => {
//     console.log('successfully deleted collection');
//     res.status(200).json(res.locals.data);
//   }
// )

module.exports = router;