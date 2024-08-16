import React from 'react';
import ActionButtons from '../components/actionButton';
import Button from 'react-bootstrap/Button';

import "../style/gameRoom.css";

function GameRoomPage() {
  return (
    <div className="game-room">
      <Button variant="primary" className='game-button' onClick={()=>('')}> 
              <p>Crea Partita</p>
      </Button>
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