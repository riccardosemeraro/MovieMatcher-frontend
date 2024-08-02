import logo from './logo.svg';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './components/profile';
import AuthenticationButton from './components/authentication-button';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';

function App() {

  return (
    <div className="App">
      <Auth0Provider
        domain="dev-u3m6ogvornq7wv88.us.auth0.com"
        clientId="9vCkdlV4e7Y2CzGbR2m9bq0ZI5bjsz71"
        redirectUri={window.location.origin}>

        <AuthenticationButton />
        <Profile />

      </Auth0Provider>
    </div>
  );
}

export default App;
