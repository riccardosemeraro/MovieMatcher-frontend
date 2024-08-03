import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/explore">Esplora</Link>
        <Link to="/settings">Impostazioni</Link>
      </nav>
    </footer>
  );
}

export default Footer;