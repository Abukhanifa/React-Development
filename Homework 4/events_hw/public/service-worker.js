/* eslint-env serviceworker */
/* Простая конфигурация PWA Service Worker для events_hw */

const APP_SHELL_CACHE = 'events-hw-app-shell-v1';
const RUNTIME_CACHE = 'events-hw-runtime-v1';

// URL'ы, которые нужны для загрузки layout'а оффлайн
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
];

// База публичного API (TMDB) для runtime-кеширования
const PUBLIC_API_ORIGIN = 'https://api.themoviedb.org';

// Разрешённые публичные пути TMDB, которые мы кешируем (листинги и детали фильмов)
const PUBLIC_TMDB_PATH_PREFIXES = [
  '/3/movie/now_playing',
  '/3/search/movie',
  '/3/movie/', // детали фильма по id
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install');

  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => {
        return cache.addAll(APP_SHELL_URLS);
      })
      .then(() => {
        // Позволяем новому SW сразу перейти в состояние "activated"
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Failed to precache app shell', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');

  // Чистим старые кеши, если имя не совпадает с текущими
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== APP_SHELL_CACHE && key !== RUNTIME_CACHE) {
              return caches.delete(key);
            }
            return null;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Навигационные запросы (React Router) — offline fallback на index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(APP_SHELL_CACHE);
        const cached = await cache.match('/index.html');
        if (cached) {
          return cached;
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Offline',
        });
      })
    );
    return;
  }

  const requestUrl = new URL(request.url);

  // Runtime-кеширование публичного API (TMDB) — стратегия network-first
  if (
    requestUrl.origin === PUBLIC_API_ORIGIN &&
    isPublicTmdbRequest(requestUrl.pathname)
  ) {
    event.respondWith(networkFirstForApi(request));
    return;
  }

  // Кеширование публичных статики (JS/CSS/images) — стратегия cache-first с докачкой
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirstForAssets(request));
    return;
  }
});

async function networkFirstForApi(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cacheKey = request.url;

  try {
    const networkResponse = await fetch(request);
    // Успешный ответ — кладём копию в кеш по URL (без учёта заголовков)
    if (networkResponse && networkResponse.ok) {
      cache.put(cacheKey, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] API request failed, trying cache', error);
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Нет кеша — возвращаем оффлайн-сообщение
    return new Response(
      JSON.stringify({
        status: 'offline',
        message: 'Вы оффлайн, и для этого запроса нет закешированных данных.',
      }),
      {
        status: 503,
        statusText: 'Offline',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Кешируем только общедоступные (не пользовательские) эндпоинты TMDB
function isPublicTmdbRequest(pathname) {
  return PUBLIC_TMDB_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

async function cacheFirstForAssets(request) {
  const cache = await caches.open(APP_SHELL_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    // Параллельно пытаемся обновить ресурс в фоне
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {
        // Игнорируем ошибки сети при фоновом обновлении
      });

    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Asset request failed and no cache', error);
    return new Response('Offline', {
      status: 503,
      statusText: 'Offline',
    });
  }
}


