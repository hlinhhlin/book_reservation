const mysql = require('mysql');

// Define your MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book-reservation-new',
});

// Connect to the database;
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
