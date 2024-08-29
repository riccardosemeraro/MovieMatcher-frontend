import '../style/matchRoom.css';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function MatchRoomPage() {

  const navigate = useNavigate();

  return (
    <>
    <div className='match-room-desktop'>
      <div className='esci'>
        <button onClick={()=> navigate('/gameRoom')}><FontAwesomeIcon icon={faSignOutAlt}/></button>
      </div>
      <div className='film-div'>
          <img src={'https://image.tmdb.org/t/p/w500/xvjOBWfm32skiwIAU2iocb6fyC8.jpg'}/> {/*immagine tmp*/}
      </div>
      <div className='titolo-bottoni'>
        <h3>Il Signore degli Anelli - La compagnia dell'Anello</h3>   
        <div className='like-dislike'>
          <button><FontAwesomeIcon icon={faTimes}/></button>
          <button><FontAwesomeIcon icon={faHeart}/></button> 
        </div>
      </div>      
    </div>
    
    <div className='match-room-mobile'>
      <div className='game-container'>
        <div className='film-div'>
          <img src={'https://image.tmdb.org/t/p/w500/xvjOBWfm32skiwIAU2iocb6fyC8.jpg'}/> {/*immagine tmp*/}
          <h3>Il Signore degli Anelli - La compagnia dell'Anello</h3>
        </div>
        <div className='like-dislike'>
          <button><FontAwesomeIcon icon={faTimes}/></button>
          <button><FontAwesomeIcon icon={faHeart}/></button> 
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