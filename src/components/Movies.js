import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async () => {
  try {
    const apiKey = '13e50a590be3d9744fb067ffed10658e';
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
    setSearchResults(response.data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}, [searchQuery]);
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, handleSearch]);

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
