import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert, autocompleteClasses, colors } from "@mui/material";
import { useBook } from "../Context/BookContext";
import { useParams, useNavigate  } from "react-router-dom";
import { capitalizeFirstLetter } from "../Config";
import { useUser } from "../Context/UserContext";
import { FormatDate, FormatISBN } from "../Config";

const BookDetailsPage = () => {
  const { bookID } = useParams();
  const { book, setBook } = useBook();
  const [isReserved, setIsReserved] = useState(false);
  const { user } = useUser();
  const [title, setTitle] = useState();
  const [penName, setPenName] = useState();
  const [isbn, setISBN] = useState();
  const [publisher, setPublisher] = useState();
  const [genre, setGenre] = useState();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const date = new Date();
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch(`http://localhost:5050/user/book/${bookID}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data.book);
        setIsReserved(data.book.Status === "available" ? false : true);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, [bookID, setBook]);

  const handleReserveClickOpen = (title, penName, ISBN, genre, publisher) => {

    
    setISBN(ISBN);
    setGenre(genre);
    setPublisher(publisher);
    setTitle(title);
    setPenName(penName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {

    if (!user || !user.id) {
      // User is not signed in, navigate to sign-in page
      navigate("/signup"); 
      return;
    }
    const userID = user.id;
    console.log("hey UserID: ",userID);
    console.log("hey BookID: ",bookID);
    // Make an API call to cancel the reservation
    fetch("http://localhost:5050/user/book/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userID, // Assuming your user object has an 'id' property
        bookId: bookID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data.message); // Log or handle the success message
  
        // Update the bookData state with the new data
        setBook((prevBookData) => {
          // Find the index of the canceled booking in the current bookData
  
          return prevBookData; // If the booking is not found, return the current state unchanged
        });
        setSnackbarOpen(true); // Show success snackbar
      })
      .catch((error) => {
        console.error("Error canceling reservation:", error);
        // Handle the error, show an error snackbar, or other error handling logic
      })
      .finally(() => {
        setOpen(false); // Close the dialog regardless of success or failure
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        {book ? (
          <>
          
            <div className="book-entry">
              <img
                className="book-image"
                src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  book.BookImage.data
                ) 
                }`}
                alt="Book Cover"
                style={{
                  marginLeft: '10px', 
                  position: 'absolute',
                  top: 129,
                  maxHeight:"1000px",
                  height : '300px',
                  width:"auto"
              
                }}
              />
              <div className="book-details">
              <Typography variant="h5" style={{ fontWeight: 900, fontSize: '2em',marginLeft: "225px",marginTop: "20px" ,marginBottom: "-10px"}}>{book.Title}</Typography>
              <Typography style={{ fontWeight: 900, fontSize: '2em',marginLeft: "225px", marginBottom: "5px" }}>By {book.PenName}</Typography>
                <Typography style={{ marginLeft: "225px", marginBottom: "-5px" }}>ISBN: {FormatISBN(book.ISBN)}</Typography>
                <Typography style={{ marginLeft: "225px", marginBottom: "-5px" }}>Genre: {book.GenreName}</Typography>
                <Typography style={{ marginLeft: "225px", marginBottom: "-5px" }}>Publisher: {book.PublisherName}</Typography>
                <Typography style={{ marginLeft: "225px" }}>
                  Status:{" "}
                  <span
                    style={{
                      color: book.Status === "unavailable" ? "red" : "green",
                      fontWeight: "bolder"
                    }}
                  >
                    {capitalizeFirstLetter(book.Status)}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  className="reserve-button"
                  onClick={() =>handleReserveClickOpen(book.title, book.penName, book.ISBN, book.GenreName, book.publisher)}
                  disabled={isReserved}
                  style={{
                    height: "45px",
                    width: "150px",
                    marginTop: "15px",
                    marginLeft: "225px",
                    // Adjusted to align with the right end of the container
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px"
                  }}
                >
                  {isReserved ? "Reserved" : "Reserve"}
                </Button>
                <Typography style={{ fontWeight: 1000, marginTop: "60px", marginRight: "90",}}>Description: </Typography>
                <Typography style={{ textIndent: '70px' }}>{book.Description}</Typography>
               
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{
                    fontWeight: "bolder",
                    color: "white",
                    backgroundColor: '#ffa500',
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
              >
                Reserving Confirmation
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography
                    component="div"
                    variant="body1"
                    style={{ color: "black" }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{book.Title}</span><br />
                    <span style={{ fontWeight: 'bold' }}>By {book.PenName}</span><br />
                    <br />
                    ISBN: {FormatISBN(book.ISBN)}
                    <br />
                    Genre: {book.GenreName}
                    <br />
                    <span>Publisher: </span>
                    {book.PublisherName}
                    <br />
                    Reserve Date: {FormatDate(date)}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  style={{ fontWeight: "bolder" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  autoFocus
                  style={{ fontWeight: "bolder" }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            {/* Snackbar for success message */}
            <Snackbar
              open={snackbarOpen}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                Successful!
              </Alert>
            </Snackbar>

          </>
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

export default BookDetailsPage;