import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__icon">👤</div>
        <h1 className="profile__title">Профиль пользователя</h1>
        <div className="profile__content">
          <div className="profile__info">
            <div className="profile__field">
              <span className="profile__label">Email:</span>
              <span className="profile__value">{currentUser.email}</span>
            </div>
            <div className="profile__field">
              <span className="profile__label">UID:</span>
              <span className="profile__value">{currentUser.uid}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="profile__button">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

