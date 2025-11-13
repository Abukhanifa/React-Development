import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesService from '../services/moviesService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const loadMovie = async () => {
    setIsLoading(true);
    setError('');
    setNotFound(false);
    try {
      const data = await moviesService.getById(id);
      setMovie(data);
    } catch (e) {
      if (e.message.includes('404')) {
        setNotFound(true);
      } else {
        setError(e.message || 'Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (notFound) {
    return (
      <div className="movie-details">
        <div className="movie-details__not-found">
          <h2>404</h2>
          <p>Фильм не найден</p>
          <button onClick={handleBack} className="movie-details__back-button">
            ← Назад
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorBox message={error} onRetry={loadMovie} />;
  }

  if (!movie) {
    return null;
  }

  const backdropUrl = moviesService.getBackdropUrl(movie.backdrop_path);
  const posterUrl = moviesService.getImageUrl(movie.poster_path, 'w500');

  return (
    <div className="movie-details">
      <button onClick={handleBack} className="movie-details__back-button">
        ← Назад к списку
      </button>

      {backdropUrl && (
        <div className="movie-details__backdrop">
          <img src={backdropUrl} alt={movie.title} />
          <div className="movie-details__backdrop-overlay"></div>
        </div>
      )}

      <div className="movie-details__content">
        <div className="movie-details__main">
          {posterUrl && (
            <img 
              src={posterUrl} 
              alt={movie.title}
              className="movie-details__poster"
            />
          )}

          <div className="movie-details__info">
            <h1 className="movie-details__title">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-details__tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-details__meta">
              <div className="movie-details__meta-item">
                <span className="movie-details__label">Рейтинг:</span>
                <span className="movie-details__value">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'Н/Д'} / 10
                  <span className="movie-details__votes">
                    ({movie.vote_count} голосов)
                  </span>
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Дата релиза:</span>
                <span className="movie-details__value">{movie.release_date || 'Н/Д'}</span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Продолжительность:</span>
                <span className="movie-details__value">
                  {movie.runtime ? `${movie.runtime} минут` : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Статус:</span>
                <span className="movie-details__value">
                  {movie.status === 'Released' ? 'Вышел' : movie.status || 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Язык оригинала:</span>
                <span className="movie-details__value">
                  {movie.original_language ? movie.original_language.toUpperCase() : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Бюджет:</span>
                <span className="movie-details__value">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Сборы:</span>
                <span className="movie-details__value">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Н/Д'}
                </span>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="movie-details__meta-item movie-details__meta-item--full">
                  <span className="movie-details__label">Жанры:</span>
                  <div className="movie-details__genres">
                    {movie.genres.map(genre => (
                      <span key={genre.id} className="movie-details__genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {movie.overview && (
              <div className="movie-details__overview">
                <h3>Описание</h3>
                <p>{movie.overview}</p>
              </div>
            )}

            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noreferrer"
                className="movie-details__homepage-link"
              >
                🌐 Официальный сайт
              </a>
            )}
          </div>
        </div>

        {movie.production_companies && movie.production_companies.length > 0 && (
          <div className="movie-details__companies">
            <h3>Производство</h3>
            <div className="movie-details__companies-list">
              {movie.production_companies.map(company => (
                <div key={company.id} className="movie-details__company">
                  {company.logo_path ? (
                    <img 
                      src={moviesService.getImageUrl(company.logo_path, 'w200')}
                      alt={company.name}
                      className="movie-details__company-logo"
                    />
                  ) : (
                    <span className="movie-details__company-name">{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;

