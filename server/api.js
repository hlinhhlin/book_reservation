const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the 'db' connection module

router.get(`/books/all`, (req, res) => {
  const query = "SELECT * FROM book"; // Adjust the query based on your database schema
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ books: results });
  });
});

router.get("/genres", (req, res) => {
  const query = `SELECT GenreName FROM genre`; 

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ genre: results });
  });
});

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

router.get('/search/:searchword', (req, res) => {
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

router.get('/book/:id', (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the URL parameter

  const query = `SELECT * FROM book WHERE Book_ID = ?`; // Use a prepared statement

  db.query(query, [bookId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ book: results[0] }); // Assuming the query returns one book
    }
  });
});

router.post('/addUser', (req, res) => {
  const { firstname, lastname, tel, email, no, soi, street, subdistrict, district, province, zipcode, username, password } = req.body;

  const sql = 'INSERT INTO User (FirstName, LastName, TelNumber, Email, Add_No, Add_Soi, Add_Street, Add_Subdistrict, Add_District, Add_Province, Add_ZipCode, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, tel, email, no, soi, street, subdistrict, district, province, zipcode, username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error inserting data into the database' });
    } else {
      res.json({ success: true });
    }
  });
});


module.exports = router;
