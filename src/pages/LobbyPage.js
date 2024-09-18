import "../style/lobby.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useContext, act } from 'react';
import Popup from '../components/Popup';
import { FaCopy } from 'react-icons/fa'; 

import {io} from 'socket.io-client';

import { ActiveGameContext } from '../contexts/activeGameContextProvider';

function LobbyPage({token}) {

    const { value: activeGame, setValue: setActiveGame } = useContext(ActiveGameContext); //stato del server

    const SOCKET_IO_URL = 'https://moviematcher-backend.onrender.com/game'; //'http://localhost:10000/game';
    const newSocket = io(SOCKET_IO_URL);
    const [socketLobby, setSocketLobby] = useState(newSocket);

    const location = useLocation();
    const navigate = useNavigate();

    const [buttonPopupImp, setButtonPopupImp] = useState(false); //
    const [roomData, setRoomData] = useState({});
    const [partecipanti, setPartecipanti] = useState([]);

    //socketLobby.off();

    const handleCopy = () => {
        // Seleziona il tag <p> immediatamente precedente
        const copia = roomData.roomName +'-'+ roomData.roomId;
        
        if (copia) {

          navigator.clipboard.writeText(copia)
            .then(() => {
                alert('Testo copiato: ' + copia);
            })
            .catch(err => {
                alert('Errore durante la copia del testo, riprova.');
            });
        } else {
          alert('Testo non trovato, impossibile copiare');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
            await navigator.share({
                title: 'Condividi questo link',
                text: 'Ecco il link per la stanza di gioco:',
                url: window.location.href, // Condivide l'URL corrente - da cambiare con il link della stanza di gioco
            });
            console.log('Link condiviso con successo');
            } catch (error) {
            console.error('Errore nella condivisione del link:', error);
            }
        } else {
            alert('La condivisione non è supportata su questo browser.');
        }
    };

    const handleGetDataRoom = async () => {
        if(socketLobby){

            const user = JSON.parse(localStorage.getItem('user'));
            const roomId = activeGame.roomId;

            socketLobby.emit('getRoom', { username: user.nickname, roomId: roomId });

            // Rimuovi i listener precedenti per evitare duplicati
            //socketLobby.off('rispostaGetRoom');            
        }
    }

    const handleCeckPlayer = () => {
        if (socketLobby) {

            const roomId = activeGame.roomId;

            socketLobby.emit('statoPartecipantiPronto', { roomId: roomId });

            // Rimuovi i listener precedenti per evitare duplicati
            //socketLobby.off('rispostaStatoPartecipantiPronto');
        }
    };

    const handleStartGame = () => {

        const user = JSON.parse(localStorage.getItem('user'));
        const roomId = activeGame.roomId;

        socketLobby.emit('avviaPartita', { username: user.nickname, roomId: roomId });

        // Rimuovi i listener precedenti per evitare duplicati
        //socketLobby.off('rispostaAvviaPartita');
    }


    useEffect(() => {
        handleGetDataRoom();

        socketLobby.off(); //Rimuovi i listener precedenti per evitare duplicati (pulisce il buffer)

        socketLobby.on('rispostaGetRoom', (data) => {
            setActiveGame(data);
            console.log('Dati attuali: ', data);
            setRoomData(data.variabiliRoom);
            console.log('Dati stanza: ', roomData);
            setPartecipanti(data.variabiliRoom.listaPartecipanti);
            console.log('Partecipanti: ', partecipanti, 'type: ', typeof(partecipanti));
        });

        socketLobby.on('rispostaStatoPartecipantiPronto', (data) => {
            if (data.risposta) {
                // Se tutti i partecipanti sono pronti, invia la richiesta per avviare la partita
                handleStartGame();
            } else {
                alert('Non tutti i partecipanti sono pronti.');
            }
        });

        socketLobby.on('rispostaAvviaPartita', (data) => {
            console.log('Risposta dal server: ', data);
            setActiveGame(data);
            navigate('/gameRoom/matchRoom');
        });

        socketLobby.on('rispostaPartecipaPartita', (data) => {
            console.log('Risposta dal server: ', data);
            setActiveGame(data);
            console.log('Dati attuali: ', data);
            setRoomData(data.variabiliRoom);
            console.log('Dati stanza: ', roomData);
            setPartecipanti(data.variabiliRoom.listaPartecipanti);
            console.log('Partecipanti: ', partecipanti, 'type: ', typeof(partecipanti));
        });

    }, [socketLobby]);

    return (
        <>

        <div className="lobby-mobile">
            <div className="dati-partita">
                <div className="dati">
                <p>Codice:</p>
                <p>{roomData.roomName}-{roomData.roomId}</p>
                <button className="dati-button" onClick={handleCopy}><FaCopy/></button> {/*📋 */}
                </div>
                <div className="dati">
                    <p>Link:</p>
                    <button className="dati-button" onClick={handleShare}>Condividi</button>
                </div>
                <div className="dati">
                    <p>Modalità:</p>
                    <p>{roomData.impostazioni}</p>
                </div>
            </div>
            <div className="giocatori">
                <h3>Giocatori</h3>
                <ul>
                    {
                        partecipanti.length > 0 ? partecipanti.map((p) => <li>{p.username}</li>) 
                        : <li>Non ci sono partecipanti</li>
                    }
                </ul>
            </div>
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={activeGame.modalita} token={token} roomName={activeGame.roomName} roomId={activeGame.roomId}/> 
                }
                <button className={roomData.creatore === activeGame.variabiliRoom.me.username ? "bottoni-button" : "bottoni-button-disabled" }  onClick={handleCeckPlayer} disabled={roomData.creatore !== activeGame.variabiliRoom.me.username}>Avvia</button>
            </div>
        </div>

        <div className="lobby-desktop">
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={activeGame.modalita} token={token} roomName={activeGame.roomName} roomId={activeGame.roomId}/>
                }
                <button className={roomData.creatore === activeGame.variabiliRoom.me.username ? "bottoni-button" : "bottoni-button-disabled" }  onClick={handleCeckPlayer} disabled={roomData.creatore !== activeGame.variabiliRoom.me.username}>Avvia</button>
            </div>
            <div className="dati-container">
                <div className="dati-partita">
                    <div className="dati">
                        <p>Codice:</p>
                        <p>{roomData.roomName}-{roomData.roomId}</p>
                        <button className="dati-button" onClick={handleCopy}><FaCopy/></button>
                    </div>
                    <div className="dati">
                        <p>Link:</p>
                        <button className="dati-button" onClick={handleShare}>Condividi</button>
                    </div>
                    <div className="dati">
                        <p>Modalità:</p>
                        <p>{roomData.impostazioni}</p>
                    </div>
                </div>
                <div className="giocatori">
                    <h3>Giocatori</h3>
                    <ul>
                        {
                            partecipanti.length > 0 ? partecipanti.map((p) => <li>{p.username}</li>) 
                            : <li>Non ci sono partecipanti</li>
                        }
                    </ul>
                </div>
            </div>
        </div>

        </>
    );
}

export default LobbyPage;