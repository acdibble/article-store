const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  body: {
    type: String,
  },
  tags: {
    type: [String],
  },
});

module.exports = mongoose.model('article', ArticleSchema);
