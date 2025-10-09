import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = (process.env.REACT_APP_TMDB_TOKEN || process.env.TMDB_TOKEN || '').trim();


  const loadMovies = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!token) {
        // eslint-disable-next-line no-console
        console.warn('Token not found.');
      }
      const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
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

  return (
    <section className="movie-list">
      <div className="movie-list__controls">
        <button className="movie-list__button" onClick={loadMovies} disabled={isLoading}>
          {isLoading ? 'Loading…' : 'Load Movies'}
        </button>
        {error && <span className="movie-list__error">{error}</span>}
      </div>
      <ul className="movie-list__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </section>
  );
}

export default MovieList;


