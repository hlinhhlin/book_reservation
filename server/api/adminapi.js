const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the 'db' connection module

router.post("/book/borrow", (req, res) => {
  const { bookingId } = req.body;
  const today = new Date();

  // Transaction to ensure both INSERT and UPDATE queries are executed or none
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }

    // Get User_ID and Book_ID from the booking record
    const getBookingDetailsSql =
      "SELECT User_ID, Book_ID FROM booking WHERE Booking_ID = ?";
    db.query(getBookingDetailsSql, [bookingId], (err, results) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: "Error retrieving booking details" });
        });
        return;
      }

      if (results.length === 0) {
        db.rollback(() => {
          res.status(404).json({ error: "Booking not found" });
        });
        return;
      }

      const userId = results[0].User_ID;
      const bookId = results[0].Book_ID;

      // Insert into borrowing table
      const bookSql =
        "INSERT INTO borrowing (User_ID, Book_ID, BorrowDate, ReturnDate, Status) VALUES (?, ?, ?, ?, 'borrowed')";

      db.query(
        bookSql,
        [
          userId,
          bookId,
          new Date(),
          new Date(today.getDate() + 14)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res
                .status(500)
                .json({ error: "Error inserting data into the database" });
            });
            return;
          }

          const insertedBookingId = result.insertId;

          // Update booking status to 'borrowed'
          const updateBookingSql =
            'UPDATE booking SET Status = "borrowed" WHERE Booking_ID = ?';
          db.query(updateBookingSql, [bookingId], (err) => {
            if (err) {
              console.error(err);
              db.rollback(() => {
                res
                  .status(500)
                  .json({ error: "Error updating booking status" });
              });
              return;
            }

            // Commit the transaction
            db.commit((err) => {
              if (err) {
                console.error(err);
                db.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Error committing transaction" });
                });
                return;
              }
              res.json({ id: insertedBookingId });
            });
          });
        }
      );
    });
  });
});

router.post("/book/return", (req, res) => {
  const { borrowedId } = req.body;

  // Transaction to ensure both UPDATE and other queries are executed or none
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }

    // Update the Status in the borrowing table
    const updateReturnStatusSql =
      'UPDATE borrowing SET Status = "returned" WHERE Borrowing_ID = ?';
    db.query(updateReturnStatusSql, [borrowedId], (err, result) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res
            .status(500)
            .json({ error: "Error updating Status in the database" });
        });
        return;
      }

      // Check if any rows were affected (book was returned)
      if (result.affectedRows === 0) {
        db.rollback(() => {
          res
            .status(404)
            .json({ error: "Borrowing record not found or not borrowed" });
        });
        return;
      }

      // Get the book ID for further updates
      const getBookIdSql = "SELECT Book_ID FROM borrowing WHERE Borrowing_ID = ?";
      db.query(getBookIdSql, [borrowedId], (err, results) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).json({ error: "Error retrieving book ID" });
          });
          return;
        }

        if (results.length === 0) {
          db.rollback(() => {
            res.status(404).json({ error: "Borrowing record not found" });
          });
          return;
        }

        const bookId = results[0].Book_ID;

        // Check if there is a 'fine' transaction
        const checkFineTransactionSql =
          'SELECT * FROM Transaction WHERE Borrowing_ID = ? AND Type = "fine" AND Status = "pending"';
        db.query(checkFineTransactionSql, [borrowedId], (err, fineResults) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res
                .status(500)
                .json({ error: "Error checking fine transaction" });
            });
            return;
          }

          if (fineResults.length > 0) {
            // Update 'fine' transaction status to 'successful'
            const updateFineTransactionSql =
              'UPDATE Transaction SET Status = "successful" WHERE Borrowing_ID = ? AND Type = "fine"';
            db.query(updateFineTransactionSql, [borrowedId], (err) => {
              if (err) {
                console.error(err);
                db.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Error updating fine transaction status" });
                });
                return;
              }

              // Update book status to 0 (available)
              const updateBookStatusSql =
                "UPDATE book SET Status = 0 WHERE Book_ID = ?";
              db.query(updateBookStatusSql, [bookId], (err) => {
                if (err) {
                  console.error(err);
                  db.rollback(() => {
                    res
                      .status(500)
                      .json({ error: "Error updating book status" });
                  });
                  return;
                }

                // Commit the transaction
                db.commit((err) => {
                  if (err) {
                    console.error(err);
                    db.rollback(() => {
                      res
                        .status(500)
                        .json({ error: "Error committing transaction" });
                    });
                    return;
                  }

                  res.json({ message: "Book returned successfully" });
                });
              });
            });
          } else {
            // No 'fine' transaction, proceed with the book return process
            // Update book status to 0 (available)
            const updateBookStatusSql =
              "UPDATE book SET Status = 0 WHERE Book_ID = ?";
            db.query(updateBookStatusSql, [bookId], (err) => {
              if (err) {
                console.error(err);
                db.rollback(() => {
                  res.status(500).json({ error: "Error updating book status" });
                });
                return;
              }

              // Commit the transaction
              db.commit((err) => {
                if (err) {
                  console.error(err);
                  db.rollback(() => {
                    res
                      .status(500)
                      .json({ error: "Error committing transaction" });
                  });
                  return;
                }

                res.json({ message: "Book returned successfully" });
              });
            });
          }
        });
      });
    });
  });
});

router.post("/transaction/fine", (req, res) => {
  const { borrowedId, amount } = req.body;
  const today = new Date();

  // Check the status of the borrowing and get the User_ID
  const checkStatusAndUserIdSql =
    "SELECT User_ID, Status FROM Borrowing WHERE Borrowing_ID = ?";
  db.query(checkStatusAndUserIdSql, [borrowedId], (statusErr, statusResult) => {
    if (statusErr) {
      console.error(statusErr);
      return res.status(500).json({ error: "Error checking book status" });
    }

    if (statusResult.length === 0) {
      return res.status(400).json({ error: "Doesn't have this Borrow_ID" });
    }

    const borrowingStatus = statusResult[0].Status;
    const userId = statusResult[0].User_ID;

    // If the book is still borrowed, insert the fine transaction with 'pending' status
    if (borrowingStatus === "borrowed") {
      const insertTransactionSql =
        "INSERT INTO Transaction (Borrowing_ID, User_ID, TransactionDate, Status, Amount, Type) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(
        insertTransactionSql,
        [borrowedId, userId, today, "pending", amount, "fine"],
        (err, result) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Error inserting data into the database" });
          }

          const transactionID = result.insertId; // Retrieve the last inserted ID
          res.json({ id: transactionID });
        }
      );
    } else {
      console.log("This Borrow_ID has returned already");
    }
  });
});

router.post("/transaction/fine/updateAmount", (req, res) => {
    const { transactionId, newAmount } = req.body;

    // Check if the transaction exists
    const checkTransactionSql =
        "SELECT * FROM Transaction WHERE Transaction_ID = ? AND Type = 'fine'";
    db.query(checkTransactionSql, [transactionId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error(checkErr);
            return res.status(500).json({ error: "Error checking transaction" });
        }

        if (checkResult.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // Update the amount if the transaction exists
        const updateAmountSql =
            "UPDATE Transaction SET Amount = ? WHERE Transaction_ID = ?";
        db.query(
            updateAmountSql,
            [newAmount, transactionId],
            (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(updateErr);
                    return res
                        .status(500)
                        .json({ error: "Error updating amount in the database" });
                }

                // Check if the update was successful
                if (updateResult.affectedRows === 0) {
                    return res
                        .status(500)
                        .json({ error: "Error updating amount. No rows affected." });
                }

                res.json({ message: "Amount updated successfully" });
            }
        );
    });
});

module.exports = router;
