const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the 'db' connection module

router.post("/book/borrow", (req, res) => {
  const { bookingId } = req.body;
  const today = new Date();
  today.setHours(today.getHours() + 7); // Adding 7 hours to set it to GMT+7

  // Transaction to ensure both INSERT and UPDATE queries are executed or none
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }

    const getBookingDetailsSql =
      "SELECT UserID, BookID FROM Booking WHERE BookingID = ?";
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

      const userId = results[0].UserID;
      const bookId = results[0].BookID;

      // Check if the user has more than 5 borrowings
      const countBorrowingsSql = "SELECT COUNT(*) AS borrowingCount FROM Borrowing WHERE UserID = ? AND Status='borrowed'";
      db.query(countBorrowingsSql, [userId], (err, result) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).json({ error: "Error checking user borrowings" });
          });
          return;
        }

        const borrowingCount = result[0].borrowingCount;

        if (borrowingCount >= 5) {
          res.status(400).json({ error: "User has reached the maximum number of borrowings (5)" });
          return;
        }

        // Insert into borrowing table
        const borrowSql =
          "INSERT INTO Borrowing (UserID, BookID, BorrowDate, ReturnDate, Status) VALUES (?, ?, ?, ?, 'borrowed')";

        const returnDate = new Date();
        returnDate.setHours(returnDate.getHours() + 7);
        returnDate.setDate(today.getDate() + 14);

        const formattedReturnDate = returnDate.toISOString().slice(0, 19).replace("T", " ");

        db.query(
          borrowSql,
          [
            userId,
            bookId,
            today.toISOString().slice(0, 19).replace("T", " "),
            formattedReturnDate,
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

            const insertedBorrowingId = result.insertId;

            // Update booking status to 'borrowed'
            const updateBookingSql =
              'UPDATE booking SET Status = "borrowed" WHERE BookingID = ?';
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
                res.json({ id: insertedBorrowingId });
              });
            });
          }
        );
      });
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
      'UPDATE borrowing SET Status = "returned" WHERE BorrowingID = ?';
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
      const getBookIdSql = "SELECT BookID FROM Borrowing WHERE BorrowingID = ?";
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

        const bookId = results[0].BookID;

        // Check if there is a 'fine' transaction
        const checkFineTransactionSql =
          'SELECT * FROM Transaction WHERE BorrowingID = ? AND Type = "fine" AND Status = "pending"';
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
              'UPDATE Transaction SET Status = "successful" WHERE BorrowingID = ? AND Type = "fine"';
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
                "UPDATE Book SET Status = 'available' WHERE BookID = ?";
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
              "UPDATE book SET Status = 'available' WHERE BookID = ?";
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

  const checkStatusAndUserIdSql =
    "SELECT UserID, Status FROM Borrowing WHERE BorrowingID = ?";
  db.query(checkStatusAndUserIdSql, [borrowedId], (statusErr, statusResult) => {
    if (statusErr) {
      console.error(statusErr);
      return res.status(500).json({ error: "Error checking book status" });
    }

    if (statusResult.length === 0) {
      return res.status(400).json({ error: "Doesn't have this BorrowID" });
    }

    const borrowingStatus = statusResult[0].Status;
    const userId = statusResult[0].UserID;

    // If the book is still borrowed, insert the fine transaction with 'pending' status
    if (borrowingStatus === "borrowed") {
      const insertTransactionSql =
        "INSERT INTO Transaction (BorrowingID, UserID, TransactionDate, Status, Amount, Type) VALUES (?, ?, ?, ?, ?, ?)";
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
      console.log("This BorrowID has returned already");
    }
  });
});

router.post("/transaction/fine/updateAmount", (req, res) => {
  const { transactionId, newAmount } = req.body;

  // Check if the transaction exists
  const checkTransactionSql =
    "SELECT * FROM Transaction WHERE TransactionID = ? AND Type = 'fine'";
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
      "UPDATE Transaction SET Amount = ? WHERE TransactionID = ?";
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
