import React from 'react';
import { Link } from 'react-router-dom';
import '../style/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';

function Footer() {

  //anno attuale
  const anno = new Date().getFullYear();

  return (
    <footer className="app-footer">
      
      <p> © {anno} MovieMatcher - All right reserved </p>
      <p className='smaller'> Informazioni sui Film fornite da <a href = "https://www.themoviedb.org/" >TMDB</a> </p>
      <p className='smaller'> Progetto sviluppato da <a href='https://github.com/riccardosemeraro'> Riccardo Semeraro </a> - <a href='https://github.com/GaiSer27'> Gaia Sergio </a> - <a href='https://github.com/wDaaV' > Davide Verditto </a> </p>
      
    </footer>
  );
}

export default Footer;