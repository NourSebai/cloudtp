// index.js

const express = require('express');
const moduleTech = require('./moduleTech');

const app = express();
const port = 3004;
const cors=require('cors');
app.use(cors());

// Use express.json() for parsing JSON in the request body
app.use(express.json());

// GET /technologies
app.get('/technologies', (req, res) => {
  const technologies = moduleTech.getTechnologies();
  res.status(200).json({ technologies });
});

// GET /technologies/:id
app.get('/technologies/:id', (req, res) => {
  const technologieId = parseInt(req.params.id);
  const technologie = moduleTech.getTechnologyById(technologieId);

  if (technologie) {
    res.status(200).json({ technologie });
  } else {
    res.status(404).json({ message: 'Technologie non trouvée' });
  }
});

// POST /technologies
app.post('/technologies', (req, res) => {
  const nouvelleTechnologie = req.body;
  moduleTech.addTechnology(nouvelleTechnologie);
  res.status(201).json({ message: 'Création d\'une nouvelle technologie', technologie: nouvelleTechnologie });
});

// PUT /technologies/:id
app.put('/technologies/:id', (req, res) => {
  const technologieId = parseInt(req.params.id);
  const nouveauxDetails = req.body;
  const resultatMiseAJour = moduleTech.updateTechnology(technologieId, nouveauxDetails);

  if (resultatMiseAJour === 1) {
    res.status(200).json({ message: `Mise à jour des détails de la technologie ${technologieId}`, nouveauxDetails });
  } else {
    res.status(404).json({ message: 'Technologie non trouvée' });
  }
});

// DELETE /technologies/:id
app.delete('/technologies/:id', (req, res) => {
  const technologieId = parseInt(req.params.id);
  const resultatSuppression = moduleTech.deleteTechnology(technologieId);

  if (resultatSuppression === 1) {
    res.status(200).json({ message: `Suppression de la technologie ${technologieId}` });
  } else {
    res.status(404).json({ message: 'Technologie non trouvée' });
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
