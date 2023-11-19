import { createContext, useContext, useState } from 'react';

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const setGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const clearGenre = () => {
    setSelectedGenre(null);
  };

  return (
    <GenreContext.Provider value={{ selectedGenre, setGenre, clearGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenre = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useGenre must be used within a GenreProvider');
  }
  return context;
};
