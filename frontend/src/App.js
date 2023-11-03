// app.js or index.js

import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books when the component mounts
    fetch('http://localhost:3000/books/all')
      .then(response => response.json())
      .then(data => {
        setBooks(data.books); // Update the state with the fetched books
      })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.Book_ID}>
            <strong>Title:</strong> {book.Title} - <strong>Status:</strong> {book.Status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
