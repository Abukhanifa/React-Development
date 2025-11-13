import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__icon">🎬</div>
          <h1 className="about__title">О проекте</h1>
          <p className="about__description">
            Это веб-приложение для просмотра списка фильмов, находящихся в прокате. 
            Вы можете искать фильмы по названию, просматривать детальную информацию 
            о каждом фильме, включая рейтинги, описания, жанры и многое другое.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

