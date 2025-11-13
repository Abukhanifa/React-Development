import React from 'react';
import './ErrorBox.css';

function ErrorBox({ message, onRetry }) {
  return (
    <div className="error-box">
      <div className="error-box__icon">⚠️</div>
      <h3 className="error-box__title">Ошибка</h3>
      <p className="error-box__message">{message}</p>
      {onRetry && (
        <button className="error-box__retry-button" onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
}

export default ErrorBox;

