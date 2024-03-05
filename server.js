// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Récupérer les variables d'environnement
const PORT = process.env.PORT || 3000;
const URL_MONGOOSE = process.env.URL_MONGOOSE || 'mongodb://localhost:27017';
const DBNAME = process.env.DBNAME || 'tp2-cloudNative';

// Créer une instance d'Express
const app = express();

// Middleware pour permettre l'analyse des requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS pour gérer les requêtes cross-origin
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(`${URL_MONGOOSE}/${DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Gestion des erreurs de connexion à la base de données
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

// Redirection des requêtes vers les fichiers de routes appropriés
app.use('/authors', require('./routes/author'));
app.use('/publishers', require('./routes/publisher'));
app.use('/books', require('./routes/book'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
