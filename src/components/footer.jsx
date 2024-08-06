import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="desktop-footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/explore">Esplora</Link>
          <Link to="/settings">Profilo</Link>
        </nav>
      </div>
      <div className="mobile-footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/explore">Esplora</Link>
          <Link to="/settings">Profilo</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;