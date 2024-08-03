import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">TinderClone</Link>
      <nav>
        <Link to="/profile">Profilo</Link>
        <Link to="/messages">Messaggi</Link>
      </nav>
    </header>
  );
}

export default Header;