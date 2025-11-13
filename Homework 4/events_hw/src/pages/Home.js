import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__hero">
        <img 
          src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80" 
          alt="Cinema" 
          className="home__hero-image"
        />
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__title">Добро пожаловать в Movie Database</h1>
          <p className="home__subtitle">
            Исследуйте мир кино: смотрите фильмы в прокате, узнавайте детали и находите свои любимые картины
          </p>
        </div>
      </div>

      <div className="home__content">
        <section className="home__features">
          <div className="home__feature-card">
            <div className="home__feature-icon">🎬</div>
            <h3>Фильмы в прокате</h3>
            <p>Смотрите список актуальных фильмов в кинотеатрах</p>
            <Link to="/items" className="home__link">Перейти к списку →</Link>
          </div>

          <div className="home__feature-card">
            <div className="home__feature-icon">🔍</div>
            <h3>Поиск фильмов</h3>
            <p>Найдите нужный фильм по названию с помощью удобного поиска</p>
          </div>

          <div className="home__feature-card">
            <div className="home__feature-icon">📊</div>
            <h3>Детальная информация</h3>
            <p>Узнайте больше о каждом фильме: рейтинг, описание, жанры и многое другое</p>
          </div>
        </section>

        <section className="home__cta">
          <h2>Начните исследование</h2>
          <p>Откройте для себя мир кино с нашим приложением</p>
          <Link to="/items" className="home__cta-button">Смотреть фильмы</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;

