import React, { useState } from 'react';

export const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setInputValue('');
  };

  const updateInputValue = (value) => {
    setInputValue(value);
  }; 

  return (
    <SearchContext.Provider value={{ inputValue, searchQuery, handleSearch, updateInputValue, clearSearch}}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;