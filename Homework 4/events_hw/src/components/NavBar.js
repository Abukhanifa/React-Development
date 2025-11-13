import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          🎬 Movies
        </NavLink>
        
        <ul className="navbar__menu">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/items" 
              className={({ isActive }) => 
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
            >
              Вход
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

