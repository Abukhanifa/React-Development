import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Отправляем письмо подтверждения автоматически после регистрации
      await sendEmailVerification(userCredential.user);
      navigate('/profile');
    } catch (error) {
      let errorMessage = 'Произошла ошибка при регистрации';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email уже используется';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Неверный формат email';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Операция не разрешена. Обратитесь к администратору';
          break;
        case 'auth/weak-password':
          errorMessage = 'Пароль слишком слабый';
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
    <div className="signup">
      <div className="signup__container">
        <div className="signup__icon">📝</div>
        <h1 className="signup__title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="signup__form">
          <div className="signup__form-group">
            <label htmlFor="email" className="signup__label">Email</label>
            <input
              type="email"
              id="email"
              className="signup__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Введите ваш email"
            />
          </div>
          <div className="signup__form-group">
            <label htmlFor="password" className="signup__label">Пароль</label>
            <input
              type="password"
              id="password"
              className="signup__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Введите пароль (минимум 6 символов)"
            />
          </div>
          <div className="signup__form-group">
            <label htmlFor="confirmPassword" className="signup__label">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              className="signup__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Повторите пароль"
            />
          </div>
          {error && <div className="signup__error">{error}</div>}
          <button 
            type="submit" 
            className="signup__button" 
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="signup__info">
          Уже есть аккаунт? <Link to="/login" className="signup__link">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

