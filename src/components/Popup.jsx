import '../style/popup.css'
import Button from 'react-bootstrap/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilm, faEdit, faTicket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { act, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

import { ActiveGameContext } from '../contexts/activeGameContextProvider';

import { io } from 'socket.io-client'; 

function Popup (props){

    const { value: activeGame, setValue: setActiveGame } = useContext(ActiveGameContext); //stato del server

    let token = props.token;

    const SOCKET_IO_URL = 'https://moviematcher-backend.onrender.com/game'; //'http://localhost:10000/game';
    const newSocket = io(SOCKET_IO_URL);
    const [socketPopup, setSocketPopup] =  useState(newSocket);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [films, setFilms] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedFilms, setSelectedFilms] = useState([]);
    const [genre, setGenre] = useState();
    const [matches, setMatches] = useState([]);

    const [inviteCode, setInviteCode] = useState();

    const [dropdownValue, setDropdownValue] = useState("Film da vedere");
    const options = [
        "Film da vedere",
        "Film visti",
        "Generi",
    ]
    function handleSelect(event) {
        setDropdownValue(event.target.value);
        console.log('dropdownValue: ', dropdownValue, 'type of: ', typeof(dropdownValue));
    }

    const handleCheckboxChange = (film) => {
        setSelectedFilms((prevSelectedFilms) => {
            const filmExists = prevSelectedFilms.some(f => f.id === film.id);
            if (filmExists) {
                return prevSelectedFilms.filter(f => f.id !== film.id);
            } else {
                return [...prevSelectedFilms, film];
            }
        });

    };

    const handleGetHistory = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('token: ', token);
        console.log('user: ', user);

        axios.get('https://moviematcher-backend.onrender.com/user/getMyHistoryMatch', 
          { headers: {Authorization: 'Bearer '+ token , nickname: user.nickname} })
          .then((response) => {
            console.log(response.data);
            setMatches(response.data.historyMatch);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const handleCreateGame = () => {
        if (socketPopup) {
            socketPopup.emit('creaPartita', {
                username: JSON.parse(localStorage.getItem('user')).nickname,
                roomName: document.querySelector('.nome-partita input').value,
                modalita: dropdownValue
              });
        }
    };

    const handleJoinGame = (roomName, roomId) => {

        console.log('roomName: ', roomName, 'roomId: ', roomId);

        if (socketPopup) {
            socketPopup.emit('partecipaPartita', {
                username: JSON.parse(localStorage.getItem('user')).nickname,
                roomName: roomName,
                roomId: roomId
            });
        }
    };

    const handleConfirm = () => { // Invia la lista dei film selezionati al server
        if (socketPopup) {
            const user = JSON.parse(localStorage.getItem('user'));
            const roomId = activeGame.roomId;
            const roomName = activeGame.roomName;

            console.log('roomId: ', activeGame.roomId, 'roomName: ', activeGame.roomName, 'user: ', user.nickname, 'selectedFilms: ', selectedFilms);

            socketPopup.emit('invioListaFilm', {
                username: user.nickname,
                roomId: roomId,
                roomName: roomName,
                listaFilm: selectedFilms
            });
        }
    };

    useEffect(() => {
        if(props.type === 'MatchHistory'){
            handleGetHistory();
        }
    }, [props.trigger]);

    useEffect(() => {

        socketPopup.off(); //rimuovo tutti i listener precedenti

        //voglio mettermi in ascolto di una risposta dal server e se arriva vado nella lobby
        socketPopup.on('rispostaCreazionePartita', (data) => {
            console.log('Risposta dal server: ', data);        
            setActiveGame(data); //modifico il contesto ActiveGameContext
            navigate('/gameRoom/lobby' /*, { state: { roomName: data.roomName, roomId: data.roomId, typeMatch: dropdownValue } }*/);
        });

        // Metti in ascolto l'evento 'rispostaPartecipaPartita'
        socketPopup.on('rispostaPartecipaPartita', (data) => {
            console.log('Risposta dal server: ', data);
            setActiveGame(data); //modifico il contesto ActiveGameContext
            navigate('/gameRoom/lobby' /*, { state: {roomName: data.roomName, roomId: data.roomId }}*/);
        });

        // Metti in ascolto l'evento 'rispostaPartecipazionePartitaNegata'
        socketPopup.on('rispostaPartecipazionePartitaNegata', (data) => {
            alert('Partecipazione negata: ' + data.message);     
        });

        // Metti in ascolto l'evento 'rispostaInvioLista'
        socketPopup.on('rispostaInvioLista', (data) => {
            console.log('Risposta dal server: ', data);
            setActiveGame(data); //modifico il contesto ActiveGameContext
            alert(data.message);
            props.setTrigger(false);
        });

    }, [socketPopup]);

    useEffect(() => {

        if (props.trigger && activeGame) {
            if(props.token && activeGame.variabiliRoom.impostazioni && activeGame.variabiliRoom.impostazioni === 'Film da vedere'){
                axios.post('https://moviematcher-backend.onrender.com/user/getWatchList', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname }}, { headers: {Authorization: 'Bearer '+token} })
                    .then (response => {
                        console.log('Risposta dal backend: ', response.data);
                        setFilms(response.data.movies);
                        setTitle(response.data.title);
                    })
                    .catch(err => {
                        console.error(err);
                        setTitle(err.response.data.title);
                    });
            
            }
            else if(props.token && activeGame.variabiliRoom.impostazioni && activeGame.variabiliRoom.impostazioni === 'Film visti'){

                axios.post('https://moviematcher-backend.onrender.com/user/getMyList', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname }}, { headers: {Authorization: 'Bearer '+token} })
                    .then (response => {
                        console.log('Risposta dal backend: ', response.data);
                        setFilms(response.data.movies);
                        setTitle(response.data.title);
                    })
                    .catch(err => {
                        console.error(err);
                        setTitle(err.response.data.title);
                    });
            }
            else if(props.token && activeGame.variabiliRoom.impostazioni && activeGame.variabiliRoom.impostazioni === 'Generi'){

                const roomId = props.roomId;
                const roomName = props.roomName;
                setGenre('Generi non ancora disponibili');

                /*axios.post('https://moviematcher-backend.onrender.com/user/getAllGenres', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname }}, { headers: {Authorization: 'Bearer '+token} })
                    .then (response => {
                        console.log('Risposta dal backend: ', response.data);
                        setGenre(response.data.genres);
                    })
                    .catch(err => {
                        console.error(err);
                        setGenre(err.response.data.genres);
                    });
                */
            }
        }

    }, [props.trigger, token, activeGame.modalita, activeGame.roomId, activeGame.roomName]);

    useEffect(() => {

        const roomName = searchParams.get('roomName');
        const roomId = searchParams.get('roomId');
        const nomePartita = roomName+'-'+roomId;

        // Se il parametro esiste, imposta il valore del campo input
        if (nomePartita) {
          setInviteCode(nomePartita);
        }
      }, []);

    return (
        (props.trigger) ? (

        <div className='overlay'>
                    {
                        props.type==="Crea-partita" &&
                        <>
                        <div className="popup">
                            <button className="close-btn" onClick={() => props.setTrigger(false)}> <FontAwesomeIcon icon={faTimes} /> </button>
                            <div className="contenitore-crea">
                                <div className='titolo-popup'>
                                    <h1>Impostazioni Partita</h1>
                                </div>
                                <div className='gioca-con'>
                                    <FontAwesomeIcon icon={faFilm} className='gioca-con-icon'/>
                                    <h2> Gioca con </h2>


                                    <div className='from-select-container'>
                                        <select className="from-select"  value={dropdownValue} onChange={handleSelect}>
                                            {options.map(option => (
                                                <option className='option-dropdown'  key={option} value={option}>
                                                    {option}
                                                </option>                
                                            ))}
                                        </select> 
                                        <div className='from-select-arrow'></div>
                                    </div>


                                </div>
                                <div className='nome-partita'>
                                    <FontAwesomeIcon icon={faEdit} className='nome-partita-icon'/>
                                    <input type="text" placeholder="Inserire Nome Partita" />
                                </div>
                                <div className='crea-partita'>
                                    <Button variant="primary" className='crea-button' onClick={handleCreateGame}>
                                        <h2 className='titolo-bottone-crea'>Crea Partita</h2>
                                    </Button>
                                </div>                      
                            </div>
                        </div>
                            
                        </>
                    }
                    {
                        props.type==="Partecipa-a-partita" &&
                        <>
                        <div className="popup">
                            <button className="close-btn" onClick={() => props.setTrigger(false)}> <FontAwesomeIcon icon={faTimes} /> </button>
                            <div className="contenitore-partecipa">
                                <div className="titolo-popup">
                                    <h1>Inserisci codice</h1>
                                </div>
                                <div className='codice-partita'>
                                    <FontAwesomeIcon icon={faTicket} className='codice-partita-icon'/>
                                    <input type="text" placeholder="NomePartita-XXXXX" value={inviteCode !== 'null-null' ? inviteCode : ''} onChange={(e) => setInviteCode(e.target.value)}/>
                                </div>
                                <div className='partecipa-partita'>
                                    <Button variant="primary" className='partecipa-button' onClick={() => handleJoinGame(document.querySelector('.codice-partita input').value.split('-')[0], document.querySelector('.codice-partita input').value.split('-')[1])}> 
                                        <h2>Partecipa a partita</h2>
                                    </Button>
                                </div>
                            </div> 
                        </div>
                        </>
                    }
                    {
                        props.type==="Impostazioni-partita" && 
                        <>
                        <div className="popup-impostazioni">
                            <button className="close-btn" onClick={() => props.setTrigger(false)}> <FontAwesomeIcon icon={faTimes} /> </button>
                            <div className="contenitore-impostazioni">
                                <div className="titolo-popup">
                                    <h1>Seleziona {activeGame.variabiliRoom.impostazioni === 'Generi' ? 'Generi' : 'Film'}</h1>
                                </div>
                                <div className='lista-elementi'>
                                    <div className='container-elementi'>
                                        {films.length > 0 &&
                                            <ListGroup className='lista-film'>
                                                {films.map((film) => (
                                                    <ListGroup.Item key={film.id} className='lista-film-item'>
                                                        <div className='film-item' key={film.id} onClick={() => handleCheckboxChange(film)}>
                                                            <img src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title} draggable="false"/> 
                                                        </div>
                                                        <p onClick={() => handleCheckboxChange(film)}>{film.title}</p>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedFilms.includes(film)} 
                                                            onChange={() => handleCheckboxChange(film)} 
                                                        />
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>  
                                        }
                                        {genre && 
                                            <p>{genre}</p>
                                        }
                                    </div>                       
                                </div>
                                {activeGame.variabiliRoom.impostazioni !== 'Generi' &&
                                <div className='invia-impostazioni'>
                                    <Button variant="primary" className='impostazioni-button' onClick={handleConfirm}> 
                                        <h2>Conferma</h2>
                                    </Button>
                                </div>
            }
                            </div> 
                        </div>
                        </>
                    }
                    {
                        props.type==="MatchHistory" &&
                        <>
                        <div className="popup-impostazioni">
                            <button className="close-btn" onClick={() => props.setTrigger(false)}> <FontAwesomeIcon icon={faTimes} /> </button>
                            <div className="contenitore-match">
                                <div className='titolo-popup'>
                                    <h1>Match History</h1>
                                </div>
                                <div className='lista-match-container'>
                                    {/* */}
                                    <ListGroup className='lista-match'>
                                        {matches.length >0 ? matches.map((match) => (
                                            <ListGroup.Item key={match.roomId} className='match-element'>                                                
                                                <p>Partita: <br/> {match.roomName}-{match.roomId}</p>
                                                <p>Stato: <br/>{match.stato}</p>
                                                {match.stato === 'Aperta' ? <button onClick={() => handleJoinGame(match.roomName, match.roomId)}>Entra &nbsp; <FontAwesomeIcon icon={faArrowRight} /></button> : match.stato === 'Terminata' ? <p>Vincitore: <br/>{match.listaFilm[0].film.title}</p> : <p></p>}
                                            </ListGroup.Item>  
                                            ))
                                        : <p>Non ci sono match</p>
                            }
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                        </>
                    }
        </div>
        ) : ""
    );
}

export default Popup;

/*
    const SOCKET_IO_URL = 'http://localhost:9000/game';
    const [socketPopup, setSocketPopup] = useState(null);
    const [sendRequest, setSendRequest] = useState('');

    useEffect(() => {
        if(props.type !== "Impostazioni-partita"){
            // Connessione al server Socket.io
            let newSocket = io(SOCKET_IO_URL);
            setSocketPopup(newSocket);
            
            //dopo che ha ottenuto un codice di partita
            newSocket = io(SOCKET_IO_URL+'/gameRoom/creaPartita'); 
            setSocketPopup(newSocket);
            navigate('/gameRoom/lobby', {socket: socketPopup});
        }
    }, [sendRequest]); // Eseguito solo al primo render
*/