import '../style/matchRoom.css';
import { useState, useContext, useEffect, act } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import WheelSpinner from '../components/WheelSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import {io} from 'socket.io-client';

import { ActiveGameContext } from '../contexts/activeGameContextProvider';

function MatchRoomPage() {

  const { value: activeGame, setValue: setActiveGame } = useContext(ActiveGameContext); //stato del server

  const SOCKET_IO_URL = 'http://localhost:10000/game'; //'https://moviematcher-backend.onrender.com/game'; 
  const newSocket = io(SOCKET_IO_URL);
  const [socketMatch, setSocketMatch] = useState(newSocket);

  const navigate = useNavigate();

  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeClass, setSwipeClass] = useState('');
  const [buttonColor, setButtonColor] = useState({ left: '', right: '' });

  const vettTitoli = activeGame.variabiliRoom.listaFilm;
  const [scores, setScores] = useState(Array(vettTitoli.length).fill(0)); // Inizializza i punteggi a 0

  const handleSwipe = (direction) => {

    let newScores = [...scores];

    if (direction === 'left') {
      console.log('Dislike');
      setSwipeClass('swipe-left');
      setButtonColor({ left: 'red', right: '' });
      // Aggiungi la logica per il dislike
      newScores[currentIndex] = -0.25; // Assegna 0 per dislike
    } else if (direction === 'right') {
      console.log('Like');
      setSwipeClass('swipe-right');
      setButtonColor({ left: '', right: 'green' });
      // Aggiungi la logica per il like
      newScores[currentIndex] = 1; // Assegna 1 per like
    }

    setScores(newScores);

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      console.log('Index:', currentIndex);
      setSwipeClass('');
      setButtonColor({ left: '', right: '' });
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <>
    { currentIndex < vettTitoli.length && (
      <>
      <div className='match-room-desktop'>
        <div className='esci'>
          <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
        </div>
          <div className={`film-div ${swipeClass}`} {...handlers}>
            {
              console.log('currentIndex', currentIndex, 'vett', vettTitoli, 'vett[i]', vettTitoli[currentIndex])
            }
            {
              vettTitoli.length > 0 ?
                <img src={'https://image.tmdb.org/t/p/w780'+vettTitoli[currentIndex].film.poster_path} alt="Film" draggable="false" />
              : <h3>Attendi</h3>
            }
          </div>
        <div className='titolo-bottoni'>
          <h3>Titolo del film</h3>   
          <div className='like-dislike'>
            <button style={{ backgroundColor: buttonColor.left }}
                    onClick={() => handleSwipe('left')}>
                    <FontAwesomeIcon icon={faTimes}/>
            </button>
            <button style={{ backgroundColor: buttonColor.right }}
                    onClick={() => handleSwipe('right')}>
                    <FontAwesomeIcon icon={faHeart}/>
            </button> 
          </div>
        </div>      
      </div>
      
      <div className='match-room-mobile'>
        <div className='game-container'>
          <div className={`film-div ${swipeClass}`} {...handlers}>
            {
              vettTitoli.map((movie) => {
                <img src={movie.film.poster_path} alt="Film" draggable="false" />
              }
            )}
            <h3>Titolo del film</h3>
          </div>
          <div className='like-dislike'>
            <button style={{ backgroundColor: buttonColor.left }} onClick={() => handleSwipe('left')}>
                                                                    <FontAwesomeIcon icon={faTimes}/>
            </button>
            <button style={{ backgroundColor: buttonColor.right }} onClick={() => handleSwipe('right')}>
                                                                    <FontAwesomeIcon icon={faHeart}/>
            </button> 
          </div>
        </div>
        <div className='esci'>
          <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
        </div>
      </div>
      </>
    )}
    { currentIndex >= vettTitoli.length && (
      <>
      {
        console.log('Punteggi finali:', scores)
        //invio punteggi al server

      }
      <div className='match-room-desktop'>
        <div className='end-game'>
          <WheelSpinner lista={vettTitoli} vincitore={0}/>        
          <div className='esci'>
            <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
          </div>
        </div>
      </div>
      <div className='match-room-mobile'>
        <div className='end-game'>
          <div className='ruota'>
            <WheelSpinner lista={vettTitoli} vincitore={0}/>  
          </div>      
          <div className='esci'>
            <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
          </div>
        </div>
      </div>
      
      </>
    )}
    </>
  );
}

export default MatchRoomPage;