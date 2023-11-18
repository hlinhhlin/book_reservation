import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const FantasyPage = () => {
  const [books, setBooks] = useState([]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  

  useEffect(() => {
    // Fetch books based on Genre_ID = 1 (Fantasy)
    fetch('http://localhost:5050/user/genre/fantasy') // Assuming endpoint returns an array of books
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books); // Update state with fetched books
      })
      .catch((error) => {
        console.log('Error fetching books:', error);
      });
  }, []);
    
  return (
    <Box>
      <Paper elevation={0} variant="outlined">
        {books && books.map(({ Title, BookImage, Status, Penname }, index) => (
          <div key={index} className="book-entry">
            <img className="book-image" src={`data:image/jpeg;base64,${arrayBufferToBase64(BookImage)}`} alt="Book Cover" />
            <div className="book-details">
              <Typography variant="h5">{Title}</Typography>
              <Typography>Author: {Penname}</Typography>
              <Typography>Status: {Status}</Typography>
            </div>
          </div>
        ))}
      </Paper>
    </Box>
    /*<Box>
    <Paper elevation={0} variant="outlined">
      <div className="book-entry">
        <img className="book-image" src="img1.jpg" alt="Book Image" />
        <div className="book-details">
          <Typography variant="h5">The Night Circus</Typography>
          <Typography>Erin Morgenstern</Typography>
          <Typography>Status: Available</Typography>
        </div>
      </div>
      <hr/>
      <div className="book-entry">
        <img className="book-image" src="img2.jpg" alt="Book Image" />
        <div className="book-details">
          <Typography variant="h5">The Kite Runner</Typography>
          <Typography>Khaled Hosseini</Typography>
          <Typography>Status: Available</Typography>
        </div>
      </div>
      <hr/>
      <div className="book-entry">
        <img className="book-image" src="img3.jpg" alt="Book Image" />
        <div className="book-details">
          <Typography variant="h5">The Girl on the Train</Typography>
          <Typography>Paula Hawkins</Typography>
          <Typography>Status: Available</Typography>
        </div>
      </div>
      <hr/>
      <div className="book-entry">
        <img className="book-image" src="img4.jpg" alt="Book Image" />
        <div className="book-details">
          <Typography variant="h5">Brave New World</Typography>
          <Typography>Aldous Huxley</Typography>
          <Typography>Status: Available</Typography>
        </div>
      </div>
      <hr/>
      <div className="book-entry">
        <img className="book-image" src="img5.jpg" alt="Book Image" />
        <div className="book-details">
          <Typography variant="h5">The Hobbit</Typography>
          <Typography>J.R.R. Tolkien</Typography>
          <Typography>Status: Available</Typography>
        </div>
      </div>
    </Paper>
  </Box>*/
  );
};

export default FantasyPage;