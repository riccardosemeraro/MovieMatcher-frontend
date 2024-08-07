import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="desktop-footer">
        <p>footer sito</p>
      </div>
      <div className="mobile-footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/gameRoom">Game Room</Link>
          <Link to="/profile">Profilo</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;