import React from 'react';
import '../style/footer.css';

function Footer() {

  //anno attuale
  const anno = new Date().getFullYear();

  return (
    <footer className="app-footer">

      <div className="desktop-footer">
        <p> © {anno} MovieMatcher - All right reserved </p>
        <p className='smaller'> Informazioni sui Film fornite da <a href = "https://www.themoviedb.org/" >TMDB</a> </p>
        <p className='smaller'> Progetto sviluppato da <a href='https://github.com/riccardosemeraro'> Riccardo Semeraro </a> - <a href='https://github.com/GaiSer27'> Gaia Sergio </a> - <a href='https://github.com/wDaaV' > Davide Verditto </a> </p>
      </div>

      <div className='mobile-footer'>
        <p> © {anno} MovieMatcher - All right reserved </p>
        <p className='smaller'> Informazioni sui Film fornite da <a href = "https://www.themoviedb.org/" >TMDB</a> </p>
        <p className='smaller'> Progetto sviluppato da <br/> <a href='https://github.com/riccardosemeraro'> Riccardo Semeraro </a> - <a href='https://github.com/GaiSer27'> Gaia Sergio </a> - <a href='https://github.com/wDaaV' > Davide Verditto </a> </p>
      </div>
      
    </footer>
  );
}

export default Footer;