const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  name: String,
  title: String,
  imageURL: String,
  description: String,
  downloads: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  downloadURL: String,
  showNotesURL: String,
});

module.exports = mongoose.model('Note', noteSchema);
