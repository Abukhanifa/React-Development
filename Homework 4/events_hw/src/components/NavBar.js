import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './NavBar.css';

function NavBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

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
          {!currentUser ? (
            <>
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
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => 
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  Регистрация
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  Профиль
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="navbar__button"
                >
                  Выход
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

