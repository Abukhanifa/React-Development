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

export const moviesService = {
  // Получить список фильмов в прокате
  getNowPlaying: async () => {
    const data = await fetchWithAuth('/movie/now_playing');
    return Array.isArray(data.results) ? data.results : [];
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

