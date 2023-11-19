import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const ComedyPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/user/genre/comedy')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.log('Error fetching books:', error);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };


return (
  <Box>
    <Paper elevation={0} variant="outlined">
      {books.map(({ Title, BookImage, Status, PenName }, index) => (
        <div key={index} className="book-entry">
          {console.log('BookImage:', BookImage)} 
          <img
            className="book-image"
            src={`data:image/jpeg;base64,${arrayBufferToBase64(
              BookImage
            )}`}
            alt="Book Cover"
          />
          <div className="book-details">
            <Typography variant="h5">{Title}</Typography>
            <Typography>{PenName}</Typography>
            <Typography>Status: {Status}</Typography>
          </div>
        </div>
      ))}
    </Paper>
  </Box>
);
};

export default ComedyPage;