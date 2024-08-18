import React from 'react';
import gif from '../images/gif.gif';
import '../style/loadingGif.css';

function LoadingGif() {
  return (
    <div className='loading-screen'>
      <img src={gif} className="loading-gif" alt='Attendere'/>
      <h1 className='testo-caricamento'>Caricamento...</h1> 
    </div>
  );
}

export default LoadingGif;