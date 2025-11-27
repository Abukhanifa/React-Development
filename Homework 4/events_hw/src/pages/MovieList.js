import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import { fetchItems } from '../features/items/itemsSlice';
import './MovieList.css';

function MovieList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchTerm = searchParams.get('q') || '';
  const currentPageParam = Number(searchParams.get('page')) || 1;
  const [searchValue, setSearchValue] = useState(searchTerm);
  const { list, loadingList, errorList, totalPages } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ query: searchTerm, page: currentPageParam }));
  }, [dispatch, searchTerm, currentPageParam]);

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const updateSearchParams = ({ query, page }) => {
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    if (page && page > 1) {
      params.set('page', String(page));
    }
    setSearchParams(params);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateSearchParams({ query: searchValue, page: 1 });
  };

  const clearSearch = () => {
    setSearchParams(new URLSearchParams());
    setSearchValue('');
  };

  const handlePageChange = (page) => {
    updateSearchParams({ query: searchTerm, page });
  };

  if (loadingList) {
    return <Spinner />;
  }

  if (errorList) {
    return (
      <ErrorBox
        message={errorList}
        onRetry={() => dispatch(fetchItems({ query: searchTerm, page: currentPageParam }))}
      />
    );
  }

  const hasResults = Array.isArray(list) && list.length > 0;
  const isFirstPage = currentPageParam <= 1;
  const isLastPage = currentPageParam >= totalPages;

  return (
    <section className="movie-list">
      <div className="movie-list__header">
        <h1 className="movie-list__title">Фильмы в прокате</h1>
        <div className="movie-list__search">
          <form className="movie-list__search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Поиск фильмов..."
              value={searchValue}
              onChange={handleSearchChange}
              className="movie-list__search-input"
            />
            <button type="submit" className="movie-list__search-button">
              Найти
            </button>
          </form>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="movie-list__clear-button"
            >
              Очистить
            </button>
          )}
        </div>
      </div>

      {hasResults ? (
        <ul className="movie-list__grid">
          {list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p className="movie-list__no-results">
          {searchTerm
            ? `Фильмы с названием "${searchTerm}" не найдены`
            : 'Фильмы не найдены'}
        </p>
      )}

      {totalPages > 1 && (
        <div className="movie-list__pagination">
          <button
            onClick={() => handlePageChange(currentPageParam - 1)}
            disabled={isFirstPage}
            className="movie-list__pagination-button"
          >
            ← Назад
          </button>
          <span className="movie-list__pagination-info">
            Страница {currentPageParam} из {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPageParam + 1)}
            disabled={isLastPage}
            className="movie-list__pagination-button"
          >
            Вперёд →
          </button>
        </div>
      )}
    </section>
  );
}

export default MovieList;

