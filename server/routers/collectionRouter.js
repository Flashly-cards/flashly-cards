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

module.exports = router;