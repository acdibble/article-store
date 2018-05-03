const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('article', ArticleSchema);
