import React, { useState, useEffect } from 'react';
import '../style.css'; 

function HomePage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch genres when the component mounts
    fetch('http://localhost:5000/genres')
      .then(response => response.json())
      .then(data => {
        setGenres(data.genre); // Update the state with the fetched genres
      })
      .catch(error => {
        console.log('Error fetching genres:', error);
      });
  }, []);

  return (
    <div className="book-grid">
        <div className="book-item">
            <img src="bookcover1.jpg" alt="Book 1"/>
            <p className="genre">Fiction</p>
        </div>
        <div className="book-item">
            <img src="bookcover2.jpg" alt="Book 2"/>
            <p className="genre">Mystery</p>
        </div>
        <div className="book-item">
            <img src="bookcover3.jpg" alt="Book 3"/>
            <p className="genre">Romance</p>
        </div>
    </div>
  );
}

export default HomePage;
