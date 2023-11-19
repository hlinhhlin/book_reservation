import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Grid, Paper, Button } from "@mui/material";
import { useSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [bookLatest, setBookLatest] = useState([]);
  const { searchTerm, updateSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (term) => {
    updateSearchTerm(term);
  };

  const handleSubmit = () => {
    navigate('/bookslist'); // Redirect to the book list page
  }

  useEffect(() => {
    fetch("http://localhost:5050/user/books/latest")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.books);
        setBookLatest(data.books); // Update the state with the fetched genres
      })
      .catch((error) => {
        console.log("Error fetching genres:", error);
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
      <TextField
        id="outlined-basic"
        label="Search in library"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px", width: "700px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginLeft: "30px", marginBottom: "20px", marginTop: "40px" }}
      >
        Search
      </Button>
      <Typography
        variant="h5"
        style={{ marginLeft: "30px", marginBottom: "40px", fontWeight: "1000"}}
      >
        New Arrival
      </Typography>
      <Grid container spacing={2}>
        {bookLatest.map(({ BookImage, Title }) => (
          <Grid item xs={4} key={Title}>
            <Paper
              elevation={3}
              className="paperStyle"
              style={{ boxShadow: "none" }}
            >
              {console.log(BookImage.data)}
              <img
                src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  BookImage.data
                )}`}
                className="ImageStyle"
                alt={Title} 
                style={{ width: "auto", height: "300px", objectFit: "cover", borderRadius: 10 }}
              />
              <Typography
                variant="subtitle1"
                style={{ margin: "20px", marginBottom: "40px", fontSize: "20px", cursor: "pointer" }}
              >
                {Title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
