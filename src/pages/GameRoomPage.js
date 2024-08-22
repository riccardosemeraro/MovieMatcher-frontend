import React from 'react';
import Button from 'react-bootstrap/Button';
import Popup from '../components/Popup';
import { useState, useEffect } from 'react';
import "../style/gameRoom.css";

import { useNavigate } from 'react-router-dom';

function GameRoomPage() {
  const [buttonPopup, setButtonPopup] = useState(false); //
  //const [timedPopup, setTimedPopup] = useState(false);  //

  const navigate = useNavigate();

  
  /*
  useEffect(() =>{
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000);
  }, []);


  Dato che non so inserire il commento sotto, ho tagliato la seguente parte di codice e l'ho incollata qui
      <Popup trigger={timePopup} setTrigger={setTimedPopup}> 
        <h1> My Timed Popup </h1>
        <h3> This is my time triggered popup </h3>
      </Popup>

      se mai dovesse servire, dobbiamo incollare <Popup>...</Popup> in return (sotto il popup)

  */

  return (
    <div className="game-room">
      <Button variant="primary" className='game-button' onClick={()=> setButtonPopup(true)}> 
        <h2 className='titolo-bottone'>Crea Partita</h2>
      </Button>

      {/*
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> 
        <h1 className='tipo-match'> Crea Partita </h1>
        <h3 className='altro'> This is my button triggered popup </h3>
      </Popup>
      */}

      <Button variant="primary" className='game-button' onClick={()=> navigate('/gameRoom/matchRoom')}> 
        <h2 className='titolo-bottone'>Partecipa a Partita</h2>
      </Button>
      <Button variant="primary" className='game-button' onClick={()=>('')}> 
        <h2 className='titolo-bottone'>Match History</h2>
      </Button>
    </div>
  );
}

export default GameRoomPage;