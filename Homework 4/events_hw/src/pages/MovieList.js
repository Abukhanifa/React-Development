import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import moviesService from '../services/moviesService';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchTerm = searchParams.get('q') || '';

  const loadMovies = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await moviesService.getNowPlaying();
      setMovies(data);
    } catch (e) {
      setError(e.message || 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorBox message={error} onRetry={loadMovies} />;
  }

  return (
    <section className="movie-list">
      <div className="movie-list__header">
        <h1 className="movie-list__title">Фильмы в прокате</h1>
        
        {movies.length > 0 && (
          <div className="movie-list__search">
            <input
              type="text"
              placeholder="Поиск фильмов..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="movie-list__search-input"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="movie-list__clear-button"
              >
                Очистить
              </button>
            )}
          </div>
        )}
      </div>

      {filteredMovies.length > 0 ? (
        <ul className="movie-list__grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p className="movie-list__no-results">
          {searchTerm 
            ? `Фильмы с названием "${searchTerm}" не найдены`
            : 'Фильмы не найдены'
          }
        </p>
      )}
    </section>
  );
}

export default MovieList;

