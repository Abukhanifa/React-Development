import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      let errorMessage = 'Произошла ошибка при входе';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Пользователь с таким email не найден';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Неверный пароль';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Неверный формат email';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Этот аккаунт был отключен';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Слишком много попыток. Попробуйте позже';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__icon">🔐</div>
        <h1 className="login__title">Авторизация</h1>
        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">Email</label>
            <input
              type="email"
              id="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Введите ваш email"
            />
          </div>
          <div className="login__form-group">
            <label htmlFor="password" className="login__label">Пароль</label>
            <input
              type="password"
              id="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Введите ваш пароль"
            />
          </div>
          {error && <div className="login__error">{error}</div>}
          <button 
            type="submit" 
            className="login__button" 
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p className="login__info">
          Нет аккаунта? <Link to="/signup" className="login__link">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

