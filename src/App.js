import logo from './logo.svg';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './components/profile';
import AuthenticationButton from './components/authentication-button';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import MessagesPage from './pages/messegesPage';
import ExplorePage from './pages/explorePage';
import SettingsPage from './pages/settingsPage';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Aggiungi altre route qui */}
        </Routes>
      </Router>

      <AuthenticationButton />

    
      {/*<AuthenticationButton />
      <Profile />*/}

    </div>
  );
}

export default App;
