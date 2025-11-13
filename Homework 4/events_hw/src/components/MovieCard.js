import React from 'react';
import { Link } from 'react-router-dom';
import moviesService from '../services/moviesService';
import './MovieCard.css';

function MovieCard({ movie }) {
  const posterUrl = moviesService.getPosterUrl(movie.poster_path);

  return (
    <li className="movie-card">
      <Link to={`/items/${movie.id}`} className="movie-card__link">
        {posterUrl ? (
          <img className="movie-card__poster" src={posterUrl} alt={`${movie.title} poster`} />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder" aria-hidden="true">
            <span className="movie-card__no-image">Нет изображения</span>
          </div>
        )}
        <div className="movie-card__content">
          <h3 className="movie-card__title">{movie.title}</h3>
          <p className="movie-card__meta">Релиз: {movie.release_date || 'Н/Д'}</p>
          <p className="movie-card__rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'Н/Д'}</p>
          <p className="movie-card__overview">
            {movie.overview ? movie.overview.substring(0, 150) + '...' : 'Описание отсутствует'}
          </p>
          <span className="movie-card__more">Подробнее →</span>
        </div>
      </Link>
    </li>
  );
}

export default MovieCard;

