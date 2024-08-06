import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import logo from '../images/logo.png';


function Header() {

  const { isAuthenticated } = useAuth0();

  return (
    <header className="app-header">
      <div className="desktop-header">
        <Link to="/" className="logo">Movie<img src={logo} className="logoImg" alt="logo" />Matcher</Link>
        {!isAuthenticated ? < LoginButton /> : <LogoutButton />}
      </div>
      <div className="mobile-header">
      <Link to="/" className="logo">Movie<img src={logo} className="logoImg" alt="logo" />Matcher</Link>
      </div>
    </header>
  );
}

export default Header;