import React from 'react';
import ActionButtons from '../components/actionButton';
import Button from 'react-bootstrap/Button';
import Popup from '../components/Popup';
import { useState, useEffect } from 'react';
import "../style/gameRoom.css";


function GameRoomPage() {
  const [buttonPopup, setButtonPopup] = useState(false); //
  //const [timedPopup, setTimedPopup] = useState(false);  //

  
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
        <p>Crea Partita</p>
      </Button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> 
        <h1> Crea Partita </h1>
        <h3> This is my button triggered popup </h3>
      </Popup>



      <Button variant="primary" className='game-button' onClick={()=>('')}> 
        <p>Partecipa a Partita</p>
      </Button>
      <Button variant="primary" className='game-button' onClick={()=>('')}> 
        <p>Match History</p>
      </Button>
    </div>
  );
}

export default GameRoomPage;