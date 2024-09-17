import "../style/lobby.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Popup from '../components/Popup';
import { FaCopy } from 'react-icons/fa'; 

import {io} from 'socket.io-client';

function LobbyPage({token}) {

    const SOCKET_IO_URL = 'https://moviematcher-backend.onrender.com/game'; //'http://localhost:10000/game';  

    const [socketLobby, setSocketLobby] = useState(null);

    const location = useLocation();
    const { roomName, roomId, typeMatch } = location.state || {}; //al momento li passo cosi, poi staranno nel contesto

    const socketRef = useRef(null);

    const navigate = useNavigate();

    const [buttonPopupImp, setButtonPopupImp] = useState(false); //

    const [roomData, setRoomData] = useState({});
    const [partecipanti, setPartecipanti] = useState({});

    //ho bisogno di una console.log con i parametri per capire cosa ricevo e mi serve come entro nella lobby
    console.log('roomName', roomName, ' + roomId', roomId);
    console.log('type of roomName', typeof(roomName), ' + type of roomId', typeof(roomId));

    const handleCopy = (event) => {
        // Seleziona il tag <p> immediatamente precedente
        const copia = roomName +'-'+ roomId;
        
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

            console.log('Richiesta dati partita in corso');

            socketLobby.emit('getRoom', { username: JSON.parse(localStorage.getItem('user')).nickname, roomId });

            console.log('Richiesta dati partita fatta');

            // Rimuovi i listener precedenti per evitare duplicati
            socketLobby.off('rispostaGetRoom');

            socketLobby.on('rispostaGetRoom', (data) => {
                console.log('Risposta dal server, dati ', data);
                setRoomData(data.variabiliRoom);
                console.log('RoomData: ', roomData, ' + type of roomData: ', typeof(roomData));
                console.log('Lista partecipanti type: ', typeof(data.variabiliRoom.listaPartecipanti));
                setPartecipanti(roomData.listaPartecipanti);
                console.log('Partecipanti: ', partecipanti);
            });
        }
    }

    const handleCeckPlayer = () => {
        if (socketLobby) {
            socketLobby.emit('statoPartecipantiPronto', { roomId });

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
        socketLobby.emit('avviaPartita', { username: JSON.parse(localStorage.getItem('user')).nickname, roomId });

        // Rimuovi i listener precedenti per evitare duplicati
        socketLobby.off('rispostaAvviaPartita');

        socketLobby.on('rispostaAvviaPartita', (data) => {
            console.log('Risposta dal server: ', data);
            navigate('/gameRoom/matchRoom', { state: { roomName: data.risposta.roomName, roomId: data.risposta.roomId } }) ;
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
        handleGetDataRoom();
    }, [socketLobby]);

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

    return (
        <>

        <div className="lobby-mobile">
            <div className="dati-partita">
                <div className="dati">
                <p>Codice:</p>
                <p>{roomName}-{roomId}</p>
                <button className="dati-button" onClick={handleCopy}><FaCopy/></button> {/*📋 */}
                </div>
                <div className="dati">
                    <p>Link:</p>
                    <button className="dati-button" onClick={handleShare}>Condividi</button>
                </div>
                <div className="dati">
                    <p>Modalità:</p>
                    { typeMatch === '1' ? <p>Film da Vedere</p> : typeMatch === '2' ? <p>Film Visti</p> : typeMatch === '3' ? <p>Generi</p> : <p>Non disponibile</p> }
                </div>
            </div>
            <div className="giocatori">
                <h3>Giocatori</h3>
                <ul>
                    {

                    }
                    {/* .map dei giocatori in partita */}
                </ul>
            </div>
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={typeMatch} token={token} roomName={roomName} roomId={roomId}/> 
                }
                <button className="bottoni-button" onClick={handleCeckPlayer}>Avvia</button>
            </div>
        </div>

        <div className="lobby-desktop">
            <div className="bottoni">
                <button className="bottoni-button" onClick={()=> navigate('/gameRoom')}>Esci</button>
                <button className="bottoni-button" onClick={()=> setButtonPopupImp(true)}>Film</button>
                {
                    buttonPopupImp && <Popup trigger={buttonPopupImp} setTrigger={setButtonPopupImp} type='Impostazioni-partita' list={typeMatch} token={token} roomName={roomName} roomId={roomId}/>
                }
                <button className="bottoni-button" onClick={handleCeckPlayer}>Avvia</button>
            </div>
            <div className="dati-container">
                <div className="dati-partita">
                    <div className="dati">
                        <p>Codice:</p>
                        <p>{roomName}-{roomId}</p>
                        <button className="dati-button" onClick={handleCopy}><FaCopy/></button>
                    </div>
                    <div className="dati">
                        <p>Link:</p>
                        <button className="dati-button" onClick={handleShare}>Condividi</button>
                    </div>
                    <div className="dati">
                        <p>Modalità:</p>
                        { typeMatch === '1' ? <p>Film da Vedere</p> : typeMatch === '2' ? <p>Film Visti</p> : typeMatch === '3' ? <p>Generi</p> : <p>Non disponibile</p> }
                    </div>
                </div>
                <div className="giocatori">
                    <h3>Giocatori</h3>
                    <ul>
                        {
                            console.log('partecipante',partecipanti) && partecipanti ?
                            /*
                            partecipanti.map((partecipante) => (
                                <li key={partecipante}>{partecipante.username}</li>
                            ))
                            */


                            Object.keys(partecipanti).map((key) => (
                                <li key={key}>{partecipanti[key]}</li>
                            ))
                            : <p>Non ci sono giocatori in partita</p>
                        }
                    </ul>
                </div>
            </div>
        </div>

        </>
    );
}

export default LobbyPage;