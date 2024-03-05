const mongoose = require('mongoose');

// Définir le schéma pour la collection Books
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
  publishDate: { type: Date },
  genre: { type: String }
});

// Exporter par défaut le modèle basé sur le schéma
module.exports = mongoose.model('Book', bookSchema);
