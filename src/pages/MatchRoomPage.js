import '../style/matchRoom.css';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import WheelSpinner from '../components/WheelSpinner';
import LoadingGif from '../components/loadingGif';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faSignOutAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';

import {io} from 'socket.io-client';

import { ActiveGameContext } from '../contexts/activeGameContextProvider';

function MatchRoomPage() {

  const { value: activeGame, setValue: setActiveGame } = useContext(ActiveGameContext); //stato del server

  const SOCKET_IO_URL = 'https://moviematcher-backend.onrender.com/game'; //'http://localhost:10000/game';
  const newSocket = io(SOCKET_IO_URL);
  const [socketMatch, setSocketMatch] = useState(newSocket);

  const navigate = useNavigate();

  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeClass, setSwipeClass] = useState('');
  const [buttonColor, setButtonColor] = useState({ left: '', right: '' });
  const [view, setView] = useState('game'); // game, wait, wheel, end

  const vettTitoli = activeGame.variabiliRoom ? activeGame.variabiliRoom.listaFilm : [];
  const [scores, setScores] = useState(Array(vettTitoli.length).fill(0)); // Inizializza i punteggi a 0

  const vett=[
    'titolo1',
    'titolo2',
    'titolo3',
    'titolo4',
    'titolo5',
    'titolo6'
  ]

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

      if(currentIndex === vettTitoli.length -1 && socketMatch) {
        console.log('Punteggi finali:', scores);

        const user = activeGame.variabiliRoom.me;
        const roomId = activeGame.roomId;

        console.log('roomId:', roomId, 'user:', user.username);
        console.log('Punteggi al momento dell\'invio:', newScores);

        socketMatch.emit('inviaPunteggi', { username: user.username, roomId: roomId, punteggi: newScores });
        setView('wait');
      }
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    socketMatch.on('rispostaInviaPunteggi', (data) => {
      setActiveGame(data);
      console.log('risposta: InviaPunteggi', 'Dati attuali: ', data);
    });

    socketMatch.on('rispostaInviaRuota', (data) => {
      setActiveGame(data);
      console.log('risposta: InvioRuota' ,'Dati attuali: ', data);
      setView('wheel');
    });

    socketMatch.on('rispostaInviaClassificaVincitore', (data) => {
      setActiveGame(data);
      console.log('risposta: InviaClassificaVincitore', 'Dati attuali: ', data);
      setView('end');
    });
  
  }, [socketMatch]);

  return (
    <>
    { view === 'game' && (
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
          <h3>{vettTitoli[currentIndex].film.title}</h3>   
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
              console.log('currentIndex', currentIndex, 'vett', vettTitoli, 'vett[i]', vettTitoli[currentIndex])
            }
            {
              vettTitoli.length > 0 ?
                <img src={'https://image.tmdb.org/t/p/w780'+vettTitoli[currentIndex].film.poster_path} alt="Film" draggable="false" />
              : <h3>Attendi</h3>
            }
            <h3>{vettTitoli[currentIndex].film.title}</h3>
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
    {
      view === 'wait' && (
        <>
        <div className='match-room-desktop'>
          <LoadingGif />
        </div>
        <div className='match-room-mobile'>
          <LoadingGif />
        </div>
        </>
      )
    }
    { view === 'wheel' && (
      <>
      <div className='match-room-desktop'>
        <div className='ruota'>
          <WheelSpinner lista={activeGame.parimeritoClassifica} vincitore={activeGame.vincitore}/>        
          <div className='next'>
            <button onClick={()=> setView('end')}><FontAwesomeIcon icon={faChartBar}/>&nbsp; Classifica</button>
          </div>
        </div>
      </div>
      <div className='match-room-mobile'>
        <div className='ruota'>
          <WheelSpinner lista={activeGame.parimeritoClassifica} vincitore={activeGame.vincitore}/>  
          <div className='next'>
            <button onClick={()=> setView('end')}><FontAwesomeIcon icon={faChartBar}/>&nbsp; Classifica</button>
          </div>
        </div>      
      </div>
      </>
    )}
    {
      view === 'end' && (
        <>
        <div className='match-room-desktop'>
          <div className='end-game'>
            <h3>Classifica finale</h3>
            <ul className='lista-classifica'>
              {
                activeGame.risposta.classifica.map((p) => <li>
                                                            <img src={'https://image.tmdb.org/t/p/w780'+p.film.poster_path} alt={p.film.title} />
                                                            <h3>{activeGame.risposta.classifica.findIndex((film) => film.film.id === p.film.id) + 1}° </h3>
                                                            <p>punti: {p.punteggio}</p>
                                                          </li>)
              }
            </ul>
            <div className='esci-finale'>
              <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
            </div>
          </div>
        </div>
        <div className='match-room-mobile'>
          <div className='end-game'>
            <h3>Classifica finale</h3>
            <ul className='lista-classifica'>
              {
                activeGame.risposta.classifica.map((p) => <li>
                                                            
                                                            <img src={'https://image.tmdb.org/t/p/w780'+p.film.poster_path} alt={p.film.title} />
                                                            <h3>{activeGame.risposta.classifica.findIndex((film) => film.film.id === p.film.id) + 1}° </h3>
                                                            
                                                            <p>punti: {p.punteggio}</p>
                                                          </li>)
              }
            </ul>
            <div className='esci-finale'>
              <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
            </div>
          </div>
        </div>
        </>
      )
    }
    </>
  );
}

export default MatchRoomPage;