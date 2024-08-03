import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-u3m6ogvornq7wv88.us.auth0.com"
    clientId="9vCkdlV4e7Y2CzGbR2m9bq0ZI5bjsz71"
    authorizationParams={{ redirect_uri: window.location.origin }}
    useRefreshTokens={true} //si mantiene l'accesso al refresh della pagina (dato che safari blocca i cookie di terze parti)
    cacheLocation='localstorage'> {/*cambia la destinazione dei cookie e salva i dati nel local storage*/}

      <App />

    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
