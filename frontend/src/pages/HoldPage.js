import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUser } from "../Context/UserContext";
import { FormatDate, FormatISBN } from "../Config";

const HoldPage = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // New state to store the selected booking ID
  const [bookData, setBookData] = useState([]);
  const { user } = useUser();
  const [title, setTitle] = useState();
  const [penName, setPenName] = useState();
  const [isbn, setISBN] = useState();
  const [publisher, setPublisher] = useState();
  const [genre, setGenre] = useState();

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const handleCancelClickOpen = (bookingId, title, penName, ISBN, genre, publisher) => {
    console.log(bookingId);
    setSelectedBookingId(bookingId); // Set the selected booking ID
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
    console.log(selectedBookingId);
    // Make an API call to cancel the reservation
    fetch("http://localhost:5050/user/book/cancelReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: selectedBookingId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data.message); // Log or handle the success message
  
        // Update the bookData state with the new data
        setBookData((prevBookData) => {
          // Find the index of the canceled booking in the current bookData
          const canceledBookingIndex = prevBookData.findIndex(
            (booking) => booking.BookingID === selectedBookingId
          );
  
          if (canceledBookingIndex !== -1) {
            // Create a copy of the current bookData array
            const updatedBookData = [...prevBookData];
  
            // Remove the canceled booking from the array
            updatedBookData.splice(canceledBookingIndex, 1);
  
            return updatedBookData;
          }
  
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

  useEffect(() => {
    // Fetch transactions when the component mounts
    fetch(`http://localhost:5050/user/hold/${user.id}`)
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
      {bookData === undefined || bookData.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            color: "#757575",
          }}
        >
          <Typography style={{ fontSize: "20px", color: "#000000", backgroundColor: "#ffd2cf", border: "1px solid red", borderRadius: "15px", padding: "3px 15px", display: "inline-block"}}>No data recorded.</Typography>
        </div>
      ) : (
        bookData &&
        bookData.map(({ BookingID, BookImage, Title, PenName, BookingDate, ReceiveDueDate, ISBN, PublisherName, GenreName }, index) => (
          <React.Fragment key={index}>
            <div className="img-left-format" style={{ display: "flex" }}>
              <img
                src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  BookImage.data
                )}`}
                alt="Book 2"
                style={{borderRadius: 10}}
              />
              <div className="text-format">
                <h4> {Title}</h4>
                <p> {PenName}</p>
                <div style={{ display: "flex" }}>
                  <div className="date-container">
                    <p>Expected Receiving Date:</p>
                    <p>{FormatDate(ReceiveDueDate)}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleCancelClickOpen(BookingID, Title, PenName, ISBN, GenreName, PublisherName)}
                className="cancel-button"
                style={{
                  height: "35px",
                  marginTop: "60px",
                  marginRight: "60px",
                  marginLeft: "auto", // Adjusted to align with the right end of the container
                  color: "black",
                  fontWeight: "bolder",
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                BackdropProps={{ invisible: true}}
              >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                      fontWeight: "bolder",
                      color: "white",
                      backgroundColor: "#FF0101",
                      marginBottom: "20px",
                    }}
                  >
                    Hold Cancellation Confirmation
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Typography
                        component="div"
                        variant="body1"
                        style={{ color: "black" }}
                      >
                        <span style={{ fontWeight: 'bolder' }}>{title}</span><br />
                        <span style={{ fontWeight: 'bolder' }}>{penName}</span><br />
                        ISBN: {FormatISBN(isbn)}
                        <br />
                        Genre: {genre}
                        <br />
                        <span>Publisher: </span>
                        {publisher}
                        <br />
                        Reserve Date: {FormatDate(BookingDate)}
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
            </div>
            {index < bookData.length - 1 && <hr />}{" "}
            {/* Add horizontal line if it's not the last item */}
          </React.Fragment>
        ))
      )}
  
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
    </Box>
  );
}  

export default HoldPage;
