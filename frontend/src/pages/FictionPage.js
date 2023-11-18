import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const FictionPage = () => {
    
  return (
    <Box>
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
    </Box>
  );
};

export default FictionPage;
