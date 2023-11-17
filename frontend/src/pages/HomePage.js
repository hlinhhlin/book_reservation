import React, { useState, useEffect } from "react";
import "../style.css";
import { useUser } from "../UserContext";
import { Box, Typography } from "@mui/material";

function HomePage() {
  const [genres, setGenres] = useState([]);
  const { loginUser } = useUser();

  const handleClickGenre = () => {
  };
  useEffect(() => {
    // Fetch genres when the component mounts
    fetch("http://localhost:5050/user/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genre); // Update the state with the fetched genres
      })
      .catch((error) => {
        console.log("Error fetching genres:", error);
      });
  }, []);

  return (

    <Box>
      <Typography variant="h5" style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px", fontWeight: "1000"}}>Genre</Typography>
      <div className="book-grid">
        {genres.map(({ GenreName, GenreImage }) => (
        <div className="book-item" key={GenreName} onClick={handleClickGenre}>
          <img src={`data:image/png;base64,${GenreImage}`} style={{ height: "300px", width: "auto", borderRadius: 10}}/>
          <p className="genre">{GenreName}</p>
        </div>
      ))}
    
      {/* <div className="book-item">
            <img src="bookcover2.jpg" alt="Book 2"/>
            <p className="genre">Mystery</p>
        </div>
        <div className="book-item">
            <img src="bookcover3.jpg" alt="Book 3"/>
            <p className="genre">Romance</p>
        </div>
        <div className="book-item">
            <img src="bookcover4.jpg" alt="Book 4"/>
            <p className="genre">Fantasy</p>
        </div>
        <div className="book-item">
            <img src="bookcover5.jpg" alt="Book 5"/>
            <p className="genre">Thriller</p>
        </div>
        <div className="book-item">
            <img src="bookcover6.jpg" alt="Book 6"/>
            <p className="genre">Horror</p>
        </div>
        <div className="book-item">
            <img src="bookcover7.jpg" alt="Book 7"/>
            <p className="genre">History</p>
        </div>
        <div className="book-item">
            <img src="bookcover8.jpg" alt="Book 8"/>
            <p className="genre">Biography</p>
        </div>
        <div className="book-item">
            <img src="bookcover9.jpg" alt="Book 9"/>
            <p className="genre">Kids</p>
        </div> */}

      </div>
    </Box>
    
  );
}

export default HomePage;
