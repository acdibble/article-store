const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/article');

require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/articles/create', async (req, res) => {
  try {
    console.log('NEWLY CREATED ARTICLE:\n', await Article.create(req.body));
    res.sendStatus(201);
  } catch (exc) {
    console.log('ARTICLE COULD NOT BE CREATED:\n', exc);
    res.sendStatus(500);
  }
});

app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    console.log('ARTICLE FOUND:\n', article);
    res.status(200).send(article);
  } catch (exc) {
    console.log('ARTICLE NOT FOUND');
    res.sendStatus(404);
  }
});

// SERVES STATIC HOMEPAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.\nKeep "yarn wds" running in an other terminal.`);
});
