import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="desktop-footer">
        <p>footer sito</p>
      </div>
      <div className="mobile-footer">
        <nav className="nav-footer">
          <Link to="/"><FontAwesomeIcon icon={faHome}/></Link>
          <Link to="/gameRoom"><FontAwesomeIcon icon={faGamepad}/></Link>
          <Link to="/profile"><FontAwesomeIcon icon={faUser}/></Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;