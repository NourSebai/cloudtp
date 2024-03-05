const mongoose = require('mongoose');

// Définir le schéma pour la collection Authors
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date },
  nationality: { type: String }
});

// Exporter par défaut le modèle basé sur le schéma
module.exports = mongoose.model('Author', authorSchema);