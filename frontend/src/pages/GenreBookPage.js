import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useGenre } from "../Context/GenreContext";
import { useParams, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../Config";


const GenreBookPage = () => {
    const { genre } = useParams();
    const { setGenre } = useGenre();  
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    setGenre(genre);

    fetch(`http://localhost:5050/user/genre/${genre}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
      return () => setGenre(null);
  }, [genre, setGenre]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };
  
  return (
    <Box>
      <Paper elevation={0} variant="outlined">
        {books.length > 0 ? (
          books.map(({ Title, BookImage, Status,PublisherName, PenName, bookID }, index) => (
            <div key={index} className="book-entry" onClick={() => handleBookClick(bookID)}>
              {console.log("BookImage:", BookImage)}
              <img
                className="book-image"
                src={`data:image/jpeg;base64,${arrayBufferToBase64(BookImage.data)}`}
                alt="Book Cover"
              />
              <div className="book-details">
                <Typography variant="h5">{Title}</Typography>
                <Typography>Author: {PenName}</Typography>
                <Typography>Publisher: {PublisherName}</Typography>
                <Typography>Status: {capitalizeFirstLetter(Status)}</Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography
            style={{
              fontSize: "20px",
              color: "#000000",
              backgroundColor: "#ffd2cf",
              border: "1px solid red",
              borderRadius: "15px",
              padding: "3px 15px",
              display: "inline-block",
              margin: "340px 590px",
            }}
          >
            No book data available.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default GenreBookPage;