import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  const posterUrl = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '';

  return (
    <li className="movie-card" aria-label={movie.title}>
      {posterUrl ? (
        <img className="movie-card__poster" src={posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="movie-card__poster movie-card__poster--placeholder" aria-hidden="true" />
      )}
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__meta">Release: {movie.release_date || 'N/A'}</p>
        <p className="movie-card__rating">Rating: {movie.vote_average ?? 'N/A'}</p>
      </div>
    </li>
  );
}

export default MovieCard;


