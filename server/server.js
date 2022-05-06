const express = require('express');
const app = express();
// const apiRouter = require('./routes/api');
const cors = require('cors');
const port = 3000;
const path = require('path')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(express.static('bundle'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'bundle/index.html'));
})


// set up routes 
const authRoute = require('./routers/authRouter')
const flashcardRoute = require('./routers/flashcardRouter');
const collectionRoute = require('./routers/collectionRouter');
// set up route handlers
app.use('/login', authRoute);
app.use('/cards', flashcardRoute);
app.use('/collection', collectionRoute)


// catch all route handler 
app.use((req, res) => {
  res.status(404);
  return res.send('Error: the page you are requesting not found');
});


// global error handler
app.use((err, req, res, next) =>{
  const defaultErr = {
      log: 'Express error unknown middleware error',
      status: 400,
      // message: {err: 'Error occurred'},
      message: 'Error occurred'
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log("global error: ", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`App listening on port ${port}`));

// export {};
module.exports = app;