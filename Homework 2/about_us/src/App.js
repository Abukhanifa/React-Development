import './App.css';

function App() {
  return (
    <div className="aboutus-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="aboutus">
              <h2 className="aboutus-title">About Us</h2>
              <p className="about-contacts-text">
                Бесплатно предоставляю услуги по разработке Backend и Frontend.
              </p>
              <p className="about-contacts-text">
                Ниже мои контакты! Буду рад обратной связи!
              </p>
              <a className="aboutus-more" href="#contacts">contacts</a>
            </div>
          </div>

          {/* Баннер с логотипом убран по требованию */}

          <div className="col-md-5 col-sm-6 col-xs-12">
            <div className="feature">
              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <div className="icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fdb801" d="M10.325 4.317a1 1 0 0 1 .986-.164l.58.21a1 1 0 0 0 .718 0l.58-.21a1 1 0 0 1 1.315.6l.22.6a1 1 0 0 0 .476.55l.545.3a1 1 0 0 1 .47 1.278l-.24.58a1 1 0 0 0 0 .748l.24.58a1 1 0 0 1-.47 1.278l-.545.3a1 1 0 0 0-.476.55l-.22.6a1 1 0 0 1-1.315.6l-.58-.21a1 1 0 0 0-.718 0l-.58.21a1 1 0 0 1-1.315-.6l-.22-.6a1 1 0 0 0-.476-.55l-.545-.3a1 1 0 0 1-.47-1.278l.24-.58a1 1 0 0 0 0-.748l-.24-.58a1 1 0 0 1 .47-1.278l.545-.3a1 1 0 0 0 .476-.55l.22-.6ZM12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h4>Work with heart</h4>
                    <p>
                      Делаю акцент на аккуратность, доступность и понятность кода.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <div className="icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fdb801" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.1 13.2L6.7 11l1.4-1.4 2.8 2.8 5-5L17.3 8l-6.4 7.2Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h4>Reliable services</h4>
                    <p>
                      Всегда стремлюсь к надёжным решениям.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-box">
                <div className="clearfix">
                  <div className="iconset">
                    <div className="icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fdb801" d="M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3v3a1 1 0 0 0 1.64.768L13.5 18H20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-3 7H7V8h10v2Zm-4 4H7v-2h6v2Zm4-8H7V4h10v2Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h4>Great support</h4>
                    <p>
                      Могу быстро реагировать на вопросы и предложения по улучшению.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="contacts" className="row" style={{ marginTop: 40 }}>
          <div className="col-md-12">
            <h3 className="aboutus-title">Contacts</h3>
            <p className="about-contacts-text">
              Связаться можно через :
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="about-email-text">
                Email: <a href="mailto:akuatuly8@gmail.com">akuatuly8@gmail.com</a>
              </li>
              <li className="about-github-text">
                GitHub: <a href="https://github.com/Abukhanifa" target="_blank" rel="noreferrer">github.com/Abukhanifa</a>
              </li>
              <li className="about-telegram-text">
                Telegram: <a href="https://t.me/abukhanifa_kt" target="_blank" rel="noreferrer">@abukhanifa_kt</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
