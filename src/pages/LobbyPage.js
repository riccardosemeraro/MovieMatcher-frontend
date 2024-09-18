import "../style/lobby.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useContext, act } from 'react';
import Popup from '../components/Popup';
import { FaCopy } from 'react-icons/fa'; 

import {io} from 'socket.io-client';

import { ActiveGameContext } from '../contexts/activeGameContextProvider';

function LobbyPage({token}) {

    const { value: activeGame, setValue: setActiveGame } = useContext(ActiveGameContext); //stato del server

    const SOCKET_IO_URL = 'http://localhost:10000/game'; //'https://moviematcher-backend.onrender.com/game';   
    const [socketLobby, setSocketLobby] = useState(null);
    const socketRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const [buttonPopupImp, setButtonPopupImp] = useState(false); //
    const [roomData, setRoomData] = useState({});
    const [partecipanti, setPartecipanti] = useState([]);

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

    const handleGetDataRoom = () => {
        if(socketLobby){

            const user = JSON.parse(localStorage.getItem('user'));
            const roomId = activeGame.roomId;

            socketLobby.emit('getRoom', { username: user.nickname, roomId: roomId });

            // Rimuovi i listener precedenti per evitare duplicati
            socketLobby.off('rispostaGetRoom');

            socketLobby.on('rispostaGetRoom', (data) => {
                console.log('Risposta dal server, dati ', data);
                setActiveGame(data);
                console.log('Dati attuali: ', activeGame);
                setRoomData(activeGame.variabiliRoom);
                console.log('Dati stanza: ', roomData);
                setPartecipanti(data.variabiliRoom.listaPartecipanti);
                console.log('Partecipanti: ', partecipanti, 'type: ', typeof(partecipanti));
                console.log('Valore di listaPartecipanti:', activeGame.variabiliRoom.listaPartecipanti);
                console.log('È un array?', Array.isArray(activeGame.variabiliRoom.listaPartecipanti));
            });
        }
    }

    const handleCeckPlayer = () => {
        if (socketLobby) {

            const roomId = activeGame.roomId;

            socketLobby.emit('statoPartecipantiPronto', { roomId: roomId });

            // Rimuovi i listener precedenti per evitare duplicati
            socketLobby.off('rispostaStatoPartecipantiPronto');

            socketLobby.on('rispostaStatoPartecipantiPronto', (data) => {
                if (data.risposta) {
                    // Se tutti i partecipanti sono pronti, invia la richiesta per avviare la partita
                    handleStartGame();
                } else {
                    alert('Non tutti i partecipanti sono pronti.');
                }
            });
        }
    };

    const handleStartGame = () => {

        const user = JSON.parse(localStorage.getItem('user'));
        const roomId = activeGame.roomId;

        socketLobby.emit('avviaPartita', { username: user.nickname, roomId: roomId });

        // Rimuovi i listener precedenti per evitare duplicati
        socketLobby.off('rispostaAvviaPartita');

        socketLobby.on('rispostaAvviaPartita', (data) => {
            console.log('Risposta dal server: ', data);
            setActiveGame(data);
            navigate('/gameRoom/matchRoom');
        });
    }

    /*useEffect potenzialmente da unire, divise per distinguere lo scopo di ogni useEffect*/
    useEffect(() => {
        // Connessione al server Socket.io solo la prima volta che la pagina viene caricata
        if (!socketRef.current) {
            const newSocket = io(SOCKET_IO_URL);
            socketRef.current = newSocket;
            setSocketLobby(newSocket);

            // Cleanup della connessione quando il componente viene smontato
            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                    socketRef.current = null;
                }
            };
        }
    }, []);

    useEffect(() => {
        // Gestisci la disconnessione del socket quando l'utente lascia la pagina
        const handleBeforeUnload = () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        handleGetDataRoom();
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

                    }
                </ul>
            </div>
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={activeGame.modalita} token={token} roomName={activeGame.roomName} roomId={activeGame.roomId}/> 
                }
                <button className="bottoni-button" onClick={handleCeckPlayer}>Avvia</button>
            </div>
        </div>

        <div className="lobby-desktop">
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={activeGame.modalita} token={token} roomName={activeGame.roomName} roomId={activeGame.roomId}/>
                }
                <button className="bottoni-button" onClick={handleCeckPlayer}>Avvia</button>
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
                            console.log('Valore di listaPartecipanti nel return:', activeGame.variabiliRoom.listaPartecipanti, 'È un array nel return?', Array.isArray(activeGame.variabiliRoom.listaPartecipanti)) &&
                             
                            Array.isArray(activeGame.variabiliRoom.partecipanti) && activeGame.variabiliRoom.partecipanti.length > 0 ? (
                            activeGame.variabiliRoom.partecipanti.map((partecipante, index) => (
                                <li key={index}>{partecipante.username}</li>
                            ))
                        ) : (
                            <li>Non ci sono partecipanti</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>

        </>
    );
}

export default LobbyPage;