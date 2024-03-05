// src/ApiConsumer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiConsumer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors/all');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Authors List</h1>
      <ul>
        {data.map(author => (
          <li key={author._id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiConsumer;
