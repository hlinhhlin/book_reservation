import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "../Context/UserContext";
import { FormatDate } from "../Config";

const BookFinePage = () => {
  const [bookData, setBookData] = useState([]);
  const { user } = useUser();

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  useEffect(() => {
    // Fetch transactions when the component mounts
    fetch(`http://localhost:5050/user/book/fine/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setBookData(data.books);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, []);

  return (
    <Box>
      {bookData.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            color: "#757575"
          }}
        >
          <Typography style={{ fontSize: "20px", color: "#000000", backgroundColor: "#ffd2cf", border: "1px solid red", borderRadius: "15px", padding: "3px 15px", display: "inline-block"}}>No data recorded.</Typography>
        </div>
      ) : (
        bookData.map(
          (
            { Title, BookImage, PenName, ReturnDate, Status, Amount },
            index
          ) => (
            <div
              className="img-left-format"
              style={{ display: "flex" }}
              key={index}
            >
              <img
                src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  BookImage.data
                )}`}
                alt="Book 2"
              />
              <div className="text-format" style={{ marginLeft: "50px" }}>
                <h4>Title: {Title}</h4>
                <p>Author: {PenName}</p>
                <div style={{ display: "flex" }}>
                  <div className="date-container">
                    <p>Return Date:</p>
                    <p>{FormatDate(ReturnDate)}</p>
                  </div>
                </div>
              </div>
              <h5
                style={{
                  color: "red",
                  marginTop: "200px",
                  marginLeft: "790px",
                }}
              >
                {Amount} BAHT
              </h5>
              {index < bookData.length - 1 && <hr />}{" "}
              {/* Add horizontal line if it's not the last item */}
            </div>
          )
        )
      )}
    </Box>
  );
};

export default BookFinePage;
