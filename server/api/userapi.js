const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../db"); // Import the 'db' connection module

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

router.get("/books/latest", (req, res) => {
  const query = "SELECT BookID, Title, BookImage FROM book ORDER BY BookID DESC LIMIT 6";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ books: results });
  });
});

// BookDetail
router.get("/book/:id", (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the URL parameter

  const query = `SELECT
      book.Title,
      book.BookImage,
      book.Description,
      book.ISBN,
      book.Status,
      author.PenName,
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
      res.json(results);
    }
  });
});

//SignUpUser
router.post("/addUser", async (req, res) => {
  try {
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

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const sql =
      "INSERT INTO User (FirstName, LastName, TelNumber, Email, Address, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [firstname, lastname, tel, email, address, username, hashedPassword],
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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// LogInUser
router.post("/authenticateUser", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username to ensure it doesn't contain special characters
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only allows alphanumeric characters and underscores
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Invalid username format" });
    }

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

      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (passwordMatch) {
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
          // UserImage
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

router.post("/book/reserve", (req, res) => {
  const { userId, bookId } = req.body;

  // Call the stored procedure
  const reserveProcedure = "CALL ReserveBook(?, ?)";

  db.query(reserveProcedure, [userId, bookId], (err, results) => {
    if (err) {
      console.error(err);

      // Check if it's a SQL SIGNAL error
      if (err.code === 'ER_SIGNAL_EXCEPTION' && err.sqlMessage) {
        // Send the SQL error message to the frontend
        return res.status(400).json({ error: err.sqlMessage });
      }

      return res.status(500).json({ error: "Error calling stored procedure" });
    }

    // Assuming the stored procedure returns the result you want to send in the response
    const result = results[0][0];

    res.json(result);
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

router.get("/hold/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT book.Title, Book.BookImage, author.PenName, booking.BookingID, booking.BookingDate, booking.ReceiveDueDate
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

module.exports = router;
