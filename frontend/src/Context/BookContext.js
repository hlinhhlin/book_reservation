import { createContext, useContext, useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [book, setSelectedBook] = useState(null);

  const setBook = (bookID) => {
    setSelectedBook(bookID);
  };

  const clearBook = () => {
    setSelectedBook(null);
  };

  return (
    <BookContext.Provider value={{ book, setBook, clearBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};