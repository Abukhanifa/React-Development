import React, { useState, useEffect } from 'react';
import NowPlayingCard from './NowPlayingCard';
import './NowPlayingList.css';

function NowPlayingList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = (process.env.REACT_APP_TMDB_TOKEN || process.env.TMDB_TOKEN || '').trim();

  const loadMovies = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!token) {
        throw new Error('Missing TMDB token in environment variables');
      }
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      setMovies(Array.isArray(data.results) ? data.results : []);
    } catch (e) {
      setError(e.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    loadMovies();
  }, []); 

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="now-playing-list">
      <div className="now-playing-list__controls">
        {error && <span className="now-playing-list__error">{error}</span>}
      </div>
      
      {movies.length > 0 && (
        <div className="now-playing-list__search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="now-playing-list__search-input"
          />
          <button 
            onClick={clearSearch}
            className="now-playing-list__clear-button"
            disabled={!searchTerm}
          >
            Clear
          </button>
        </div>
      )}

      <ul className="now-playing-list__grid">
        {filteredMovies.map((movie) => (
          <NowPlayingCard key={movie.id} movie={movie} />
        ))}
      </ul>
      
      {movies.length > 0 && filteredMovies.length === 0 && (
        <p className="now-playing-list__no-results">No movies found matching "{searchTerm}"</p>
      )}
    </section>
  );
}

export default NowPlayingList;
