import React from 'react';
import Button from 'react-bootstrap/Button';
import Popup from '../components/Popup';

import { useState, useContext } from 'react';
import "../style/gameRoom.css";

import { useNavigate } from 'react-router-dom';

import LoadingGif from '../components/loadingGif';

import { ServerStateContext } from '../contexts/serverStateContextProvider';

import axios from 'axios';

function GameRoomPage({invite, token}) {

  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(invite ? invite : false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

  const navigate = useNavigate();

  return (
    (!server) ? <div>
                <>
                    <LoadingGif />
                </>    
                </div> :
    <div className="game-room">
      <Button variant="primary" className='game-button' onClick={()=> setButtonPopup(true)}> 
        <h2 className='titolo-bottone'>Crea Partita</h2>
      </Button>
      {
        buttonPopup && <Popup trigger={buttonPopup} setTrigger={setButtonPopup} type='Crea-partita' /> 
      }
      <Button variant="primary" className='game-button' onClick={()=> setButtonPopup2(true)}> 
        <h2 className='titolo-bottone'>Partecipa a Partita</h2>
      </Button>
      {
        buttonPopup2 && <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2} type='Partecipa-a-partita' /> 
      }
      <Button variant="primary" className='game-button' onClick={setButtonPopup3}> 
        <h2 className='titolo-bottone'>Match History</h2>
      </Button>
      {
        buttonPopup3 && <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3} type='MatchHistory' token={token} /> 
      }
    </div>
  );
}

export default GameRoomPage;