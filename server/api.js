const express = require("express");
const router = express.Router();
const db = require("./db"); // Import the 'db' connection module

// router.get(`/books/all`, (req, res) => {
//   const query = "SELECT * FROM book"; // Adjust the query based on your database schema
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ books: results });
//   });
// });

//HomePage
router.get("/genres", (req, res) => {
  const query = `SELECT GenreName, GenreImage FROM genre`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Convert BLOB data to base64
    const genresWithBase64 = results.map(({ GenreName, GenreImage }) => ({
      GenreName,
      GenreImage: GenreImage.toString("base64"),
    }));
    res.json({ genre: genresWithBase64 });
  });
});

//HomePage>Genre
router.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre; // Extract the genre from the URL
  const query = `SELECT PenName, Title, 
  CASE 
      WHEN book.Status = 0 THEN 'available'
      ELSE 'unavailable'
  END AS Status
FROM book 
INNER JOIN genre ON book.Genre_ID = genre.Genre_ID
INNER JOIN author ON author.Author_ID = book.Author_ID
WHERE genre.GenreName = '${genre}';
  `; // Use a prepared statement

  db.query(query, [genre], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ books: results });
  });
});

//SearchPage
router.get("/search/:searchword", (req, res) => {
  const searchQuery = req.params.searchword; // Get the search query from the request's query parameters
  // SQL query to search for books by 'Title,' 'PenName,' or 'PublisherName'
  const query = `
    SELECT PenName, Title,
    CASE 
        WHEN book.Status = 0 THEN 'available'
        ELSE 'unavailable'
    END AS Status
    FROM book 
    INNER JOIN genre ON book.Genre_ID = genre.Genre_ID
    INNER JOIN author ON author.Author_ID = book.Author_ID
    INNER JOIN publisher ON publisher.Publisher_ID = book.Publisher_ID
    WHERE book.Title LIKE ? OR author.PenName LIKE ? OR PublisherName LIKE ?
  `;

  db.query(
    query,
    [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`], // Pass the search query as a parameter
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ books: results });
    }
  );
});

// BookDetail
router.get("/book/:id", (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the URL parameter

  const query = `SELECT
      book.*,
      author.PenName,
      author.Biography,
      author.AuthorImage,
      publisher.PublisherName
    FROM
      book
    JOIN
      author ON book.Author_ID = author.Author_Id
    JOIN
      publisher ON book.Publisher_ID = publisher.Publisher_ID
    WHERE
      book.Book_ID = ?;`; // Use a prepared statement

  db.query(query, [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ book: results[0] }); // Assuming the query returns one book
    }
  });
});

router.get('/books/latest', (req, res) => {
  const query = 'SELECT * FROM book ORDER BY Book_ID DESC LIMIT 6';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ books: results });
  });
});


// router.post('/addUser', (req, res) => {
//   const { firstname, lastname, tel, email, no, soi, street, subdistrict, district, province, zipcode, username, password } = req.body;
// router.get('/book/:id', (req, res) => {
//   const bookId = req.params.id; // Extract the book ID from the URL parameter
//   const query = `
//     SELECT
//       book.*,
//       author.PenName,
//       author.Biography AS AuthorBiography,
//       CONVERT(author.AuthorImage USING utf8) AS AuthorImageBase64,
//       publisher.PublisherName,
//       CONVERT(publisher.PublisherImage USING utf8) AS PublisherImageBase64,
//       CONVERT(book.BookImage USING utf8) AS BookImageBase64
//     FROM
//       book
//     JOIN
//       author ON book.Author_ID = author.Author_Id
//     JOIN
//       publisher ON book.Publisher_ID = publisher.Publisher_ID
//     WHERE
//       book.Book_ID = ?;
//   `; // Use a prepared statement

//   db.query(query, [bookId], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }

//     if (results.length === 0) {
//       res.status(404).json({ error: 'Book not found' });
//     } else {
//       // Convert images to base64
//       const bookData = results[0];
//       bookData.AuthorImageBase64 = bookData.AuthorImageBase64.toString('base64');
//       bookData.PublisherImageBase64 = bookData.PublisherImageBase64.toString('base64');
//       bookData.BookImageBase64 = bookData.BookImageBase64.toString('base64');
//       res.json({ bookData }); // Assuming the query returns one book
//     }
//   });
// });


//Author
router.get("/author/:id", (req, res) => {
  const authorId = req.params.id; // Extract the book ID from the URL parameter

  const query = `SELECT * FROM author WHERE Author_ID = ?`; // Use a prepared statement

  db.query(query, [authorId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Author not found" });
    } else {
      res.json({ author: results[0] }); // Assuming the query returns one book
    }
  });
});

//Publisher
router.get("/publisher/:id", (req, res) => {
  const publisherId = req.params.id; // Extract the book ID from the URL parameter

  const query = `SELECT * FROM publisher WHERE Publisher_ID = ?`; // Use a prepared statement

  db.query(query, [publisherId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Publisher not found" });
    } else {
      res.json({ publisher: results[0] }); // Assuming the query returns one book
    }
  });
});

router.get("/cat-by-author/:id", (req, res) => {
  const authorId = req.params.id; // Extract the book ID from the URL parameter
  const query = `SELECT * FROM book WHERE Author_ID = ?`; // Use a prepared statement
  db.query(query, [authorId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Book written by this author not found" });
    } else {
      res.json({ books: results[0] }); // Assuming the query returns one book
    }
  });
});

router.get("/cat-by-publisher/:id", (req, res) => {
  const publisherId = req.params.id; // Extract the book ID from the URL parameter
  const query = `SELECT * FROM book WHERE Publisher_ID = ?`; // Use a prepared statement
  db.query(query, [publisherId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Book published by this publisher not found" });
    } else {
      res.json({ books: results[0] }); // Assuming the query returns one book
    }
  });
});


// router.get("/user/transaction/:id", (req,res) => {
//   const userId = req.params.id;
//   const query = `SELECT * from transaction WHERE User_ID = ?`;
//   db.query(query, [userId], (err,results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: "User is not found" });
//     } else {
//       res.json(results[0]); // Assuming the query returns one book
//     }
//   })
// })

//SignUpUser
router.post("/addUser", (req, res) => {
  const {firstname, lastname, tel, email, no, soi, street, subdistrict, district, province, zipcode,
    username, password,} = req.body;

  const sql =
    "INSERT INTO User (FirstName, LastName, TelNumber, Email, Add_No, Add_Soi, Add_Street, Add_Subdistrict, Add_District, Add_Province, Add_ZipCode, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      firstname,
      lastname,
      tel,
      email,
      no,
      soi,
      street,
      subdistrict,
      district,
      province,
      zipcode,
      username,
      password,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error inserting data into the database" });
      } else {
        const userId = result.insertId; // Retrieve the last inserted ID
        res.json({ id: userId });
      }
    }
  );
});

//LogInUser
router.post("/authenticateUser", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username
    const query = "SELECT * FROM User WHERE Username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // If the user is not found, return an error
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];

      // Check if the entered password matches the stored password
      if (password === user.Password) {
        return res.json({
          id: user.User_ID,
          firstname: user.FirstName,
          lastname: user.LastName,
          tel: user.TelNumber,
          email: user.Email,
          no: user.Add_No,
          soi: user.Add_Soi,
          street: user.Add_Street,
          subdistrict: user.Add_SubDistrict,
          district: user.Add_District,
          province: user.Add_Province,
          zipcode: user.Add_ZipCode,
          username: user.Username,
          //UserImage
        });
      } else {
        // If passwords do not match, return an error
        return res.status(401).json({ error: "Invalid username or password" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/profile/:id", (req,res) => {
  const userId = req.params.id;
  const query = `SELECT * from user WHERE User_ID = ?`;
  db.query(query, [userId], (err,results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(results[0]); // Assuming the query returns one book
    }
  })
})

router.post("/book/reserve", (req, res) => {
  const { userId, bookId } = req.body;
  const today = new Date();
  const receivedDueDate = new Date(today);
  receivedDueDate.setDate(today.getDate() + 7);

  const reserveSql =
    "INSERT INTO booking (User_ID, Book_ID, BookingDate, ReceiveDueDate, Status) VALUES (?, ?, ?, ?, 'booked')";

  // Transaction to ensure both INSERT and UPDATE queries are executed or none
  db.beginTransaction((err) => { 
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }
    // Insert into booking table
    db.query(
      reserveSql,
      [userId, bookId, today, receivedDueDate.toISOString().slice(0, 19).replace("T", " ")],
      (err, result) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).json({ error: "Error inserting data into the database" });
          });
          return;
        }

        const insertedBookingId = result.insertId;

        // Update book status to 1
        const updateBookSql = "UPDATE book SET Status = 1 WHERE Book_ID = ?";
        db.query(updateBookSql, [bookId], (err) => {
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
                res.status(500).json({ error: "Error committing transaction" });
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
    const getBookingDetailsSql = 'SELECT User_ID, Book_ID FROM booking WHERE Booking_ID = ?';
    db.query(getBookingDetailsSql, [bookingId], (err, results) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: 'Error retrieving booking details' });
        });
        return;
      }

      if (results.length === 0) {
        db.rollback(() => {
          res.status(404).json({ error: 'Booking not found' });
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
        [userId, bookId, new Date(), new Date(today.getDate() + 14).toISOString().slice(0, 19).replace("T", " ")],
        (err, result) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).json({ error: "Error inserting data into the database" });
            });
            return;
          }

          const insertedBookingId = result.insertId;

          // Update booking status to 'borrowed'
          const updateBookingSql = 'UPDATE booking SET Status = "borrowed" WHERE Booking_ID = ?';
          db.query(updateBookingSql, [bookingId], (err) => {
            if (err) {
              console.error(err);
              db.rollback(() => {
                res.status(500).json({ error: 'Error updating booking status' });
              });
              return;
            }

            // Commit the transaction
            db.commit((err) => {
              if (err) {
                console.error(err);
                db.rollback(() => {
                  res.status(500).json({ error: "Error committing transaction" });
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
      res.status(500).json({ error: 'Error beginning transaction' });
      return;
    }

    // Update the Status in the borrowing table
    const updateReturnStatusSql = 'UPDATE borrowing SET Status = "returned" WHERE Borrow_ID = ?';
    db.query(updateReturnStatusSql, [borrowedId], (err, result) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: 'Error updating Status in the database' });
        });
        return;
      }

      // Check if any rows were affected (book was returned)
      if (result.affectedRows === 0) {
        db.rollback(() => {
          res.status(404).json({ error: 'Borrowing record not found or not borrowed' });
        });
        return;
      }

      // Get the book ID for further updates
      const getBookIdSql = 'SELECT Book_ID FROM borrowing WHERE Borrow_ID = ?';
      db.query(getBookIdSql, [borrowedId], (err, results) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).json({ error: 'Error retrieving book ID' });
          });
          return;
        }

        if (results.length === 0) {
          db.rollback(() => {
            res.status(404).json({ error: 'Borrowing record not found' });
          });
          return;
        }

        const bookId = results[0].Book_ID;

        // Update book status to 0 (available)
        const updateBookStatusSql = 'UPDATE book SET Status = 0 WHERE Book_ID = ?';
        db.query(updateBookStatusSql, [bookId], (err) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).json({ error: 'Error updating book status' });
            });
            return;
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              console.error(err);
              db.rollback(() => {
                res.status(500).json({ error: 'Error committing transaction' });
              });
              return;
            }

            res.json({ message: 'Book returned successfully' });
          });
        });
      });
    });
  });
});



//Cancel the reservation
router.post('/book/cancelReservation', (req, res) => {
  const { bookingId } = req.body;

  // Transaction to ensure both DELETE and UPDATE queries are executed or none
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error beginning transaction' });
      return;
    }

    // Get the book ID before deleting the booking record
    const getBookIdSql = 'SELECT Book_ID FROM booking WHERE Booking_ID = ?';
    db.query(getBookIdSql, [bookingId], (err, results) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: 'Error retrieving book ID' });
        });
        return;
      }

      if (results.length === 0) {
        db.rollback(() => {
          res.status(404).json({ error: 'Booking not found' });
        });
        return;
      }

      const bookId = results[0].Book_ID;

      // Delete the booking record
      const updateBookingSql = 'UPDATE booking SET Status = "canceled" WHERE Booking_ID = ?';
      db.query(updateBookingSql, [bookingId], (err) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res.status(500).json({ error: 'Error canceling reservation' });
          });
          return;
        }

        // Update book status to 0 (available)
        const updateBookSql = 'UPDATE book SET Status = 0 WHERE Book_ID = ?';
        db.query(updateBookSql, [bookId], (err) => {
          if (err) {
            console.error(err);
            db.rollback(() => {
              res.status(500).json({ error: 'Error updating book status' });
            });
            return;
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              console.error(err);
              db.rollback(() => {
                res.status(500).json({ error: 'Error committing transaction' });
              });
              return;
            }

            res.json({ message: 'Reservation canceled successfully' });
          });
        });
      });
    });
  });
});


//haven't check yet
router.get("/user/checkout/:id", (req,res) => {
  const userId = req.params.id;
  const query = `SELECT book.Title, author.PenName, borrowing.BorrowDate, borrowing.ReturnDate,
  COUNT(book.Book_ID) AS NumberOfBooksBorrowed
  FROM user 
  INNER JOIN borrowing ON borrowing.User_ID = user.User_ID
  INNER JOIN book ON borrowing.Book_ID = book.Book_ID
  INNER JOIN author ON author.Author_ID = book.Author_ID
  WHERE user.User_ID = ? AND borrowing.Status = 'borrowed'
  GROUP BY book.Title, author.PenName, borrowing.BorrowDate, borrowing.ReturnDate;
  `;
  db.query(query, [userId], (err,results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json({books: results, count: results.length}); // Assuming the query returns one book
    }
  })
})

router.get("/user/hold/:id", (req,res) => {
  const userId = req.params.id;
  const query = `SELECT book.Title, author.PenName, booking.BookingDate, booking.ReceiveDueDate
  FROM user 
  JOIN booking ON booking.User_ID = user.User_ID
  JOIN book ON booking.Book_ID = book.Book_ID
  JOIN author ON author.Author_ID = book.Author_ID
  WHERE user.User_ID = ? AND booking.Status = 'booked';
  `;
  db.query(query, [userId], (err,results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json({books: results, count: results.length}); // Assuming the query returns one book
    }
  })
})

module.exports = router;
