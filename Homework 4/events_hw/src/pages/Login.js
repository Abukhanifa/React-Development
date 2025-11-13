import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__icon">🔐</div>
        <h1 className="login__title">Авторизация</h1>
        <p className="login__message">Auth to be added</p>
        <p className="login__info">
          Функционал авторизации будет добавлен на следующей неделе.
          <br />
          Здесь будет форма входа для пользователей.
        </p>
      </div>
    </div>
  );
}

export default Login;

