const express = require('express');
const app = express();
// const apiRouter = require('./routes/api');
const cors = require('cors');
const port = 3000;
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('bundle'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'bundle/index.html'));
})


//login
// app.post('/register', (req, res) => {
//   return res.status(200).redirect('/login');
// })
// app.post('/register', (req, res) => {
//   return res.status(200).redirect('/newcard');
// })


//cards
// app.post('/newcard', (req, res) => {
//   return res.status(200).sendFile());
// })
// app.post('/editcard', (req, res) => {
//   return res.status(200).sendFile());
// })
// app.post('/removecard', (req, res) => {
//   return res.status(200).sendFile());
// })
// app.delete('/deletecard', (req, res) => {
//   return res.status(200).sendFile());
// })


//collection
// app.post('/newcollection', (req, res) => {
//   return res.status(200).sendFile));
// })
// app.post('/editcollection', (req, res) => {
//   return res.status(200).sendFile());
// })
// app.delete('/deletecollection', (req, res) => {
//   return res.status(200).sendFile());
// })



  //global error handler
  app.use((err, req, res) =>{
    const defaultErr = {
        log: 'Express error unknown middleware error',
        status:400,
        message: {err: 'Error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
  });

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;