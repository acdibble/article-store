/* eslint-disable no-console */

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

app.post('/api/articles/', async (req, res) => {
  try {
    const { _id } = await Article.create(req.body);
    res.status(201).send(_id);
  } catch (exc) {
    console.log('ARTICLE COULD NOT BE CREATED:\n', exc);
    res.sendStatus(500);
  }
});

app.get('/api/articles/:id?', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      res.status(200).send(await Article.findById(id));
    } catch (exc) {
      res.sendStatus(404);
    }
  } else {
    res.status(200).send(await Article.find());
  }
});

app.delete('/api/articles/:id?', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await Article.findByIdAndRemove(id);
      res.sendStatus(200);
    } catch (exc) {
      console.log('COULD NOT DELETE ARTICLE:\n', exc.message);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(405);
  }
});

app.patch('/api/articles/:id?', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      res.status(200).send(await Article.findByIdAndUpdate(id, req.body, { new: true }));
    } catch (exc) {
      console.log('ARTICLE COULD NOT BE UPDATED:\n', exc.message);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(405);
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
