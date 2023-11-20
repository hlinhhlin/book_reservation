import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useSearch } from "../Context/SearchContext";
import { capitalizeFirstLetter } from "../Config";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetch(`http://localhost:5050/user/search/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
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
        {books.length > 0 ? (
          books.map(
            ({ Title, BookImage, PublisherName, Status, PenName }, index) => (
              <div key={index} className="book-entry">
                {console.log("BookImage:", BookImage)}
                <img
                  className="book-image"
                  src={`data:image/jpeg;base64,${arrayBufferToBase64(
                    BookImage.data
                  )}`}
                  alt="Book Cover"
                />
                <div className="book-details">
                  <Typography variant="h5">{Title}</Typography>
                  <Typography>Author: {PenName}</Typography>
                  <Typography>Publisher: {PublisherName}</Typography>
                  <Typography>
                    Status:{" "}
                    <span
                      style={{
                        color: Status === "unavailable" ? "red" : "green",
                      }}
                    >
                      {capitalizeFirstLetter(Status)}
                    </span>
                  </Typography>
                </div>
              </div>
            )
          )
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
            No book data available
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default BookListPage;
