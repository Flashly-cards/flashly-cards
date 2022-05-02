const express = require('express');
const app = express();
// const apiRouter = require('./routes/api');
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('bundle'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'bundle/index.html'));
})











app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;