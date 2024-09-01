import React from 'react';
import Button from 'react-bootstrap/Button';
import Popup from '../components/Popup';
import Dropdown from '../components/Dropdown';
import { useState, useEffect, useContext } from 'react';
import "../style/gameRoom.css";
import { SlGameController } from "react-icons/sl";
import "../style/slGameController.css";
import { LuTextCursorInput } from "react-icons/lu";
import "../style/LuTextCursorInput.css";

import { useNavigate } from 'react-router-dom';

import LoadingGif from '../components/loadingGif';

import { ServerStateContext } from '../contexts/serverStateContextProvider';
//import { Dropdown } from 'bootstrap';

function GameRoomPage() {
  const [buttonPopup, setButtonPopup] = useState(false); //
  //const [timedPopup, setTimedPopup] = useState(false);  //
  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

  const navigate = useNavigate();

  
  /*
  useEffect(() =>{
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000);
  }, []);


  */

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
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> 
        <h1 className='impostazioni-match'> Impostazioni Partita </h1>
        <br/>
        <SlGameController className="controller-icon"/>
        <h2 className='giocacon'> Gioca con </h2>
        <Dropdown> </Dropdown>
        <LuTextCursorInput className="LuTextCursorInput-icon"/>
        <h2 className='nome-partita'> Nome partita </h2>
        <Dropdown> </Dropdown>

      </Popup>
      
      
        {/*>

        <Dropdown variant="primary" className="dropdown"> 
        </Dropdown>

        se giocare con film da vedere, film visti o con generi*/
        }
      {/*
        <Popup trigger={timePopup} setTrigger={setTimedPopup}> 
        <h1> My Timed Popup </h1>
        <h3> This is my time triggered popup </h3>
        </Popup>
      */}

      <Button variant="primary" className='game-button' onClick={()=> navigate('/gameRoom/lobby')}> 
        <h2 className='titolo-bottone'>Partecipa a Partita</h2>
      </Button>
      <Button variant="primary" className='game-button' onClick={()=>('')}> 
        <h2 className='titolo-bottone'>Match History</h2>
      </Button>
    </div>
  );
}

export default GameRoomPage;