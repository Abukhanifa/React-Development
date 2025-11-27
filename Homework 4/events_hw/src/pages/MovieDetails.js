import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moviesService from '../services/moviesService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import { fetchItemById } from '../features/items/itemsSlice';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedItem, loadingItem, errorItem } = useSelector((state) => state.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loadingItem) {
    return <Spinner />;
  }

  const isNotFound = errorItem?.includes('404');

  if (isNotFound) {
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

  if (errorItem) {
    return (
      <ErrorBox
        message={errorItem}
        onRetry={() => dispatch(fetchItemById(id))}
      />
    );
  }

  if (!selectedItem) {
    return null;
  }

  const backdropUrl = moviesService.getBackdropUrl(selectedItem.backdrop_path);
  const posterUrl = moviesService.getImageUrl(selectedItem.poster_path, 'w500');

  return (
    <div className="movie-details">
      <button onClick={handleBack} className="movie-details__back-button">
        ← Назад к списку
      </button>

      {backdropUrl && (
        <div className="movie-details__backdrop">
          <img src={backdropUrl} alt={selectedItem.title} />
          <div className="movie-details__backdrop-overlay"></div>
        </div>
      )}

      <div className="movie-details__content">
        <div className="movie-details__main">
          {posterUrl && (
            <img 
              src={posterUrl} 
              alt={selectedItem.title}
              className="movie-details__poster"
            />
          )}

          <div className="movie-details__info">
            <h1 className="movie-details__title">{selectedItem.title}</h1>
            
            {selectedItem.tagline && (
              <p className="movie-details__tagline">"{selectedItem.tagline}"</p>
            )}

            <div className="movie-details__meta">
              <div className="movie-details__meta-item">
                <span className="movie-details__label">Рейтинг:</span>
                <span className="movie-details__value">
                  ⭐ {selectedItem.vote_average ? selectedItem.vote_average.toFixed(1) : 'Н/Д'} / 10
                  <span className="movie-details__votes">
                    ({selectedItem.vote_count} голосов)
                  </span>
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Дата релиза:</span>
                <span className="movie-details__value">{selectedItem.release_date || 'Н/Д'}</span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Продолжительность:</span>
                <span className="movie-details__value">
                  {selectedItem.runtime ? `${selectedItem.runtime} минут` : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Статус:</span>
                <span className="movie-details__value">
                  {selectedItem.status === 'Released' ? 'Вышел' : selectedItem.status || 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Язык оригинала:</span>
                <span className="movie-details__value">
                  {selectedItem.original_language ? selectedItem.original_language.toUpperCase() : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Бюджет:</span>
                <span className="movie-details__value">
                  {selectedItem.budget ? `$${selectedItem.budget.toLocaleString()}` : 'Н/Д'}
                </span>
              </div>

              <div className="movie-details__meta-item">
                <span className="movie-details__label">Сборы:</span>
                <span className="movie-details__value">
                  {selectedItem.revenue ? `$${selectedItem.revenue.toLocaleString()}` : 'Н/Д'}
                </span>
              </div>

              {selectedItem.genres && selectedItem.genres.length > 0 && (
                <div className="movie-details__meta-item movie-details__meta-item--full">
                  <span className="movie-details__label">Жанры:</span>
                  <div className="movie-details__genres">
                    {selectedItem.genres.map(genre => (
                      <span key={genre.id} className="movie-details__genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedItem.overview && (
              <div className="movie-details__overview">
                <h3>Описание</h3>
                <p>{selectedItem.overview}</p>
              </div>
            )}

            {selectedItem.homepage && (
              <a 
                href={selectedItem.homepage} 
                target="_blank" 
                rel="noreferrer"
                className="movie-details__homepage-link"
              >
                🌐 Официальный сайт
              </a>
            )}
          </div>
        </div>

        {selectedItem.production_companies && selectedItem.production_companies.length > 0 && (
          <div className="movie-details__companies">
            <h3>Производство</h3>
            <div className="movie-details__companies-list">
              {selectedItem.production_companies.map(company => (
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

