import '../style/matchRoom.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSwipeable } from 'react-swipeable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function MatchRoomPage() {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeClass, setSwipeClass] = useState('');
  const [buttonColor, setButtonColor] = useState({ left: '', right: '' });
  const vettImg = ['https://image.tmdb.org/t/p/w500/xvjOBWfm32skiwIAU2iocb6fyC8.jpg',
                    'https://image.tmdb.org/t/p/w780/4NM05M9CUZZP3J2haWGLWClUB7Y.jpg', 
                    'https://image.tmdb.org/t/p/w780/6PCnxKZZIVRanWb710pNpYVkCSw.jpg', 
                    'https://image.tmdb.org/t/p/w780/6YmfO0K5DomBEYQPtGZauSahFbP.jpg',
                    'https://image.tmdb.org/t/p/w780/9OxcvTJwZDjQTFvY2NxiwnSrQS6.jpg',
                    'https://image.tmdb.org/t/p/w780/qIhsgno1mjbzUbs4H6DaRjhskAR.jpg'
                    ];

  const handleSwipe = (direction) => {

    if (direction === 'left') {
      console.log('Dislike');
      setSwipeClass('swipe-left');
      setButtonColor({ left: 'red', right: '' });
      // Aggiungi la logica per il dislike
    } else if (direction === 'right') {
      console.log('Like');
      setSwipeClass('swipe-right');
      setButtonColor({ left: '', right: 'green' });
      // Aggiungi la logica per il like
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= vettImg.length) {
          return 0;
        }
        return newIndex;
      });
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
    <div className='match-room-desktop'>
      <div className='esci'>
        <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
      </div>
        <div className={`film-div ${swipeClass}`} {...handlers}>
            <img src={vettImg[currentIndex]} alt="Film" draggable="false" /> {/*immagine tmp*/}
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
          <img src={vettImg[currentIndex]} alt="Film"/> {/*immagine tmp*/}
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
  );
}

export default MatchRoomPage;