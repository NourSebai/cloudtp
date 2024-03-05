const mongoose = require('mongoose');

// Définir le schéma pour la collection Publishers
const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  establishedYear: { type: Number }
});

// Exporter par défaut le modèle basé sur le schéma
module.exports = mongoose.model('Publisher', publisherSchema);
