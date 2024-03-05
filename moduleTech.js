// moduleTech.js

const fs = require('fs');

let technologies;

// Charger les données à partir du fichier JSON
try {
  const rawData = fs.readFileSync('moduleTech.json');
  technologies = JSON.parse(rawData);
} catch (error) {
  console.error('Erreur lors de la lecture du fichier JSON:', error.message);
  technologies = [];
}

module.exports = {
  getTechnologies: () => technologies,
  getTechnologyById: (id) => technologies.find(t => t.Id === id),
  addTechnology: (newTechnology) => {
    technologies.push(newTechnology);
    // Enregistrer les données mises à jour dans le fichier JSON
    saveData();
  },
  updateTechnology: (id, updatedDetails) => {
    const index = technologies.findIndex(t => t.Id === id);
    if (index !== -1) {
      technologies[index] = { ...technologies[index], ...updatedDetails };
      // Enregistrer les données mises à jour dans le fichier JSON
      saveData();
      return 1; // Mise à jour réussie
    } else {
      return 0; // Aucune technologie avec l'ID spécifié
    }
  },
  deleteTechnology: (id) => {
    const initialLength = technologies.length;
    technologies = technologies.filter(t => t.Id !== id);
    // Enregistrer les données mises à jour dans le fichier JSON
    saveData();
    return initialLength !== technologies.length ? 1 : 0; // Suppression réussie si la longueur a changé
  },
  getTechnology: (id) => {
    const technologie = technologies.find(t => t.Id === id);
    return technologie ? technologie : -1; // -1 si aucune technologie avec l'ID spécifié
  }
};

// Fonction pour enregistrer les données dans le fichier JSON
function saveData() {
  fs.writeFileSync('moduleTech.json', JSON.stringify(technologies, null, 2));
}
