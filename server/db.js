const mysql = require('mysql');

// Define your MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'book_reservation',
});

// Connect to the database;
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
