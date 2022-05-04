const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myURI = 'mongodb+srv://flashly:codesmith123@flashly.0fwpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(myURI);

const flashcardSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'collections', required: true},
  frontText: { type: String, required: true },
  backText: { type: String, required: true }
});

const collectionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  collectionName: { type: String, required: true },
  cards: { type: Object, default: {} }
});

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

const Flashcards = mongoose.model('flashcards', flashcardSchema);
const Collections = mongoose.model('collections', collectionSchema);
const Users = mongoose.model('users', userSchema);

module.exports = { Flashcards, Collections, Users };