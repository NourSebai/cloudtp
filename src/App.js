// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// App.js ou tout autre composant
/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    // Effectuez une requête GET pour récupérer la liste des technologies
    axios.get('http://localhost:3001/technologies')
      .then(response => setTechnologies(response.data))
      .catch(error => console.error('Erreur de récupération des données', error));
  }, []);

  return (
    <div>
      <h1>Liste des Technologies</h1>
      <ul>
        {technologies.map(tech => (
          <li key={tech.id}>{tech.nom} - {tech.domaine}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

*/





// src/Technologies.js
import React, { useState, useEffect } from 'react';

const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch('http://localhost:3004/technologies');
        
        if (!response.ok) {
          throw new Error(`Error fetching technologies: ${response.statusText}`);
        }

        const data = await response.json();
        setTechnologies(data.technologies);
      } catch (error) {
        console.error('Error fetching technologies:', error.message);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div>
      <h2>List of Technologies</h2>
      <ul>
        {technologies.map((tech) => (
          <li key={tech.id}>
            {tech["Nom de la technologie"]} - {tech.Domaine} ({tech["Date de création"]})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Technologies;