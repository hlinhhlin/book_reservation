import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Grid, Paper } from "@mui/material";

const SearchPage = () => {
  const [bookLatest, setBookLatest] = useState([]);

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
        style={{ marginTop: "20px", marginLeft: "20px", width: "500px" }}
      />
      <Typography
        variant="h6"
        style={{ margin: "20px", fontWeight: "bolder", fontSize: "20px" }}
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
                style={{ width: "auto", height: "300px", objectFit: "cover" }} //ไม่ใช้แล้วมันไม่ได้ TT
              />
              <Typography
                variant="subtitle1"
                style={{ margin: "20px", fontSize: "20px", cursor: "pointer" }}
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
