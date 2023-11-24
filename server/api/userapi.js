const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the 'db' connection module

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
  const query = `SELECT book.bookID, PenName, BookImage,PublisherName, Title, Status
FROM book 
INNER JOIN genre ON book.GenreID = genre.GenreID
INNER JOIN publisher ON publisher.PublisherID = book.PublisherID
INNER JOIN author ON author.AuthorID = book.AuthorID
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
    SELECT book.BookID, PenName, BookImage, Title, Status, PublisherName
    FROM book 
    INNER JOIN genre ON book.GenreID = genre.GenreID
    INNER JOIN author ON author.AuthorID = book.AuthorID
    INNER JOIN publisher ON publisher.PublisherID = book.PublisherID
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
      publisher.PublisherName,
      genre.GenreName
    FROM
      book
    JOIN
      author ON book.AuthorID = author.AuthorId
    JOIN
      publisher ON book.PublisherID = publisher.PublisherID
    JOIN
      genre ON book.GenreID = genre.GenreID
    WHERE
      book.BookID = ?;`; // Use a prepared statement

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

router.get("/books/latest", (req, res) => {
  const query = "SELECT * FROM book ORDER BY BookID DESC LIMIT 6";
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
//       author ON book.AuthorID = author.AuthorId
//     JOIN
//       publisher ON book.PublisherID = publisher.PublisherID
//     WHERE
//       book.BookID = ?;
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

  const query = `SELECT * FROM author WHERE AuthorID = ?`; // Use a prepared statement

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

  const query = `SELECT * FROM publisher WHERE PublisherID = ?`; // Use a prepared statement

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
  const query = `SELECT * FROM book WHERE AuthorID = ?`; // Use a prepared statement
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
  const query = `SELECT * FROM book WHERE PublisherID = ?`; // Use a prepared statement
  db.query(query, [publisherId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res
        .status(404)
        .json({ error: "Book published by this publisher not found" });
    } else {
      res.json({ books: results[0] }); // Assuming the query returns one book
    }
  });
});

router.get("/transaction/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * from transaction WHERE UserID = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(results); // Assuming the query returns one book
    }
  });
});

//SignUpUser
router.post("/addUser", (req, res) => {
  const {
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
  } = req.body;

  // Combine address fields into a single string
  const address =
    `${no} ${soi} ${street}, ${subdistrict}, ${district}, ${province} ${zipcode}`;

  const sql =
    "INSERT INTO User (FirstName, LastName, TelNumber, Email, Address, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [firstname, lastname, tel, email, address, username, password],
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
          id: user.UserID,
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

router.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT UserID, FirstName, LastName, TelNumber, Email, Address from user WHERE UserID = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(results[0]); // Assuming the query returns one book
    }
  });
});

router.post("/book/reserve", (req, res) => {
  const { userId, bookId } = req.body;

  // Check if the user has more than 5 bookings
  const countBookingsSql = "SELECT COUNT(*) AS bookingCount FROM booking WHERE UserID = ? AND Status ='booked'";
  db.query(countBookingsSql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error checking user bookings" });
      return;
    }

    const bookingCount = result[0].bookingCount;

    if (bookingCount >= 5) {
      res.status(400).json({ error: "User has reached the maximum number of bookings (5)" });
      return;
    }

    const today = new Date();
    const receivedDueDate = new Date(today);
    receivedDueDate.setDate(today.getDate() + 7);

    const reserveSql =
      "INSERT INTO booking (UserID, BookID, BookingDate, ReceiveDueDate, Status) VALUES (?, ?, ?, ?, 'booked')";

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
        [
          userId,
          bookId,
          today,
          receivedDueDate
        ],
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
          const updateBookSql = "UPDATE book SET Status = 'unavailable' WHERE BookID = ?";
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
              res.json({ id: insertedBookingId, date: today });
            });
          });
        }
      );
    });
  });
});
//Cancel the reservation
router.post('/book/cancelReservation', (req, res) => {
  const { bookingId } = req.body;

  // Call the stored procedure
  db.query(
    'CALL CancelReservation(?)',
    [bookingId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error calling stored procedure' });
        return;
      }

      const result = results[0][0];
      res.json(result);
    }
  );
});


router.get("/checkout/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT book.Title, book.BookImage, author.PenName, borrowing.BorrowDate, borrowing.ReturnDate
  FROM user 
  INNER JOIN borrowing ON borrowing.UserID = user.UserID
  INNER JOIN book ON borrowing.BookID = book.BookID
  INNER JOIN author ON author.AuthorID = book.AuthorID
  WHERE user.UserID = ? AND borrowing.Status = 'borrowed'
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json({ books: results, count: results.length }); // Assuming the query returns one book
    }
  });
});

router.get("/hold/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT book.Title, Book.BookImage, Book.ISBN, Genre.GenreName, author.PenName, Publisher.PublisherName, booking.BookingID, booking.BookingDate, booking.ReceiveDueDate
  FROM user 
  JOIN booking ON booking.UserID = user.UserID
  JOIN book ON booking.BookID = book.BookID
  JOIN Publisher ON book.PublisherID = Publisher.PublisherID
  JOIN Genre ON book.GenreID = Genre.GenreID
  JOIN author ON author.AuthorID = book.AuthorID
  WHERE user.UserID = ? AND booking.Status = 'booked';
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Booking is not found" });
    } else {
      res.json({ books: results, count: results.length }); // Assuming the query returns one book
    }
  });
});

//TopUp
router.post("/transaction/topup", (req, res) => {
  const { userId, amount } = req.body;
  const today = new Date();
  const sql =
    "INSERT INTO Transaction (UserID, TransactionDate, Status, Amount, Type) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [userId, today, "successful", amount, "top-up"], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error inserting data into the database" });
    } else {
      const transactionID = result.insertId; // Retrieve the last inserted ID
      res.json({ id: transactionID });
    }
  });
});

router.get("/book/fine/:id", (req, res) => {
  const userId = req.params.id; // Retrieve the user ID from the request parameters

  const query = `
    SELECT
      Book.Title,
      Book.BookImage,
      Author.PenName,
      Borrowing.ReturnDate,
      Transaction.Status,
      Transaction.Amount
    FROM
      Transaction
    JOIN
      Borrowing ON Borrowing.BorrowingID = Transaction.BorrowingID
    JOIN
      Book ON Borrowing.BookID = Book.BookID
    JOIN
      Author ON Book.AuthorID = Author.AuthorID
    WHERE
      Borrowing.ReturnDate < CURDATE()
      AND Borrowing.Status = 'borrowed'
      AND Transaction.Type = 'fine'
      AND Borrowing.UserID = ?; -- Adjust the condition based on your data model`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Convert BLOB data to base64
    res.json({ books: results, count: results.length });
  });
});

router.post("/profile/update/:id", (req, res) => {
  const userId = req.params.id;
  const { FirstName, LastName, Email, TelNumber, Address } = req.body;

  // Begin the transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }

    // Update user profile
    const updateProfileSql =
      "UPDATE user SET FirstName = ?, LastName = ?, Email = ?, TelNumber = ?, Address = ? WHERE UserID = ?";
    db.query(
      updateProfileSql,
      [FirstName, LastName, Email, TelNumber, Address, userId],
      (err, result) => {
        if (err) {
          console.error(err);
          db.rollback(() => {
            res
              .status(500)
              .json({ error: "Error updating user profile" });
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

          res.json({ message: "User profile updated successfully" });
        });
      }
    );
  });
});


module.exports = router;
