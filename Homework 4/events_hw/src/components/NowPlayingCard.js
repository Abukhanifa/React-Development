import React from 'react';
import './NowPlayingCard.css';

function NowPlayingCard({ movie }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  const posterUrl = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '';

  return (
    <li className="now-playing-card" aria-label={movie.title}>
      {posterUrl ? (
        <img className="now-playing-card__poster" src={posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="now-playing-card__poster now-playing-card__poster--placeholder" aria-hidden="true" />
      )}
      <div className="now-playing-card__content">
        <h3 className="now-playing-card__title">{movie.title}</h3>
        <p className="now-playing-card__meta">Release: {movie.release_date || 'N/A'}</p>
        <p className="now-playing-card__rating">Rating: {Math.round(movie.vote_average ?? 'N/A')}</p>
        <p className="now-playing-card__overview">{movie.overview}</p>
      </div>
    </li>
  );
}

export default NowPlayingCard;
