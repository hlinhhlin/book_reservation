import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, SnackbarContent } from '@mui/material';
import { red } from '@mui/material/colors';

const HoldPage = () => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  return (
    <Box>
      <div className="img-left-format" style={{ display: 'flex' }}>
        <img src="bookcover2.jpg" alt="Book 2" />
        <div className="text-format">
          <h4>Title</h4>
          <p>author name</p>
          <div style={{ display: 'flex' }}>
            <div className="date-container">
              <p>Expected Receiving Date:</p>
              <p>dd/mm/yyyy</p>
            </div>
          </div>
        </div>
        <Button
          onClick={handleCancelClickOpen}
          className="cancel-button"
          style={{ height: '35px', marginTop: '60px', marginLeft: '800px', color: 'black', fontWeight: 'bolder' }}
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
          <DialogTitle id="alert-dialog-title" style={{fontWeight: 'bolder', color: 'white', backgroundColor: '#FF0101', marginBottom: '20px'}}>Hold Cancellation Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography component="div" variant="body1" style={{color: 'black'}}>
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
            <Button onClick={handleClose} style={{fontWeight: 'bolder'}}>Cancel</Button>
            <Button onClick={handleConfirm} autoFocus style={{fontWeight: 'bolder'}}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <hr />

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
            <SnackbarContent
                style={{ backgroundColor: '#1DC64C', fontWeight: 'bolder' }}
                message="Successful !"
            />
      </Snackbar>

    </Box>
  );
};

export default HoldPage;

