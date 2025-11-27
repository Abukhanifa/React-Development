const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const getToken = () => {
  return (process.env.REACT_APP_TMDB_TOKEN || process.env.TMDB_TOKEN || '').trim();
};

const fetchWithAuth = async (endpoint) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Missing TMDB token in environment variables');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};

const buildEndpoint = (path, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return `${path}${queryString ? `?${queryString}` : ''}`;
};

const fetchMoviesPage = async (path, params = {}) => {
  const endpoint = buildEndpoint(path, params);
  const data = await fetchWithAuth(endpoint);
  return {
    results: Array.isArray(data.results) ? data.results : [],
    total_pages: data.total_pages || 1,
  };
};

export const moviesService = {
  // Получить один "page" фильмов в прокате
  getNowPlaying: async (page = 1) => {
    return await fetchMoviesPage('/movie/now_playing', { page });
  },

  // Поиск по TMDB
  searchMovies: async (query, page = 1) => {
    const trimmedQuery = (query || '').trim();
    if (!trimmedQuery) {
      return { results: [], total_pages: 1 };
    }

    return await fetchMoviesPage('/search/movie', {
      query: trimmedQuery,
      include_adult: false,
      page,
    });
  },

  // Получить фильм по ID
  getById: async (id) => {
    return await fetchWithAuth(`/movie/${id}`);
  },

  // Получить URL изображения
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  // Получить URL постера маленького размера
  getPosterUrl: (path) => {
    return moviesService.getImageUrl(path, 'w200');
  },

  // Получить URL бэкдропа
  getBackdropUrl: (path) => {
    return moviesService.getImageUrl(path, 'w780');
  },
};

export default moviesService;

