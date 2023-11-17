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
  SnackbarContent,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useUser } from "../UserContext";
import { FormatDate } from "../Config";

const HoldPage = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleCancelClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    setSnackbarOpen(true);
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
      {bookData &&
        bookData.map(
          ({ BookImage, Title, PenName, BookingDate, ReceiveDueDate }, index) => (
            <React.Fragment key={index}>
              <div className="img-left-format" style={{ display: "flex" }}>
                <img
                  src={`data:image/jpeg;base64,${arrayBufferToBase64(
                    BookImage.data
                  )}`}
                  alt="Book 2"
                />
                <div className="text-format">
                  <h4>Title: {Title}</h4>
                  <p>Author: {PenName}</p>
                  <div style={{ display: "flex" }}>
                    <div className="date-container">
                      <p>Expected Receiving Date:</p>
                      <p>{FormatDate(ReceiveDueDate)}</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCancelClickOpen}
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
                        The Girl on the Train
                        <br />
                        By Paula Hawkins
                        <br />
                        ISBN: 978-1594633669
                        <br />
                        Genre: Thriller
                        <br />
                        <span>Publisher: </span>
                        Riverhead Books
                        <br />
                        Reserve Date: 19/10/2023 13:32:00
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
          )
        )}

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <SnackbarContent
          style={{ backgroundColor: "#1DC64C", fontWeight: "bolder" }}
          message="Successful !"
        />
      </Snackbar>
    </Box>
  );
};

export default HoldPage;
