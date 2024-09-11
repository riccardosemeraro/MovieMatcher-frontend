import '../style/popup.css'
import Dropdown from '../components/Dropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilm, faEdit, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';


function Popup (props){

    const navigate = useNavigate();

    const [films, setFilms] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedFilms, setSelectedFilms] = useState([]);

    const handleCheckboxChange = (filmId) => {
        setSelectedFilms((prevSelectedFilms) => {
            if (prevSelectedFilms.includes(filmId)) {
                return prevSelectedFilms.filter(id => id !== filmId);
            } else {
                return [...prevSelectedFilms, filmId];
            }
        });
    };

    //voglio creare un const di nome token alla quale viene assegnato props.token e che venga assegnato solo una volta e che non sia piu modificabile
    let token = props.token;

    useEffect(() => {

        if (props.trigger) {
            console.log('token ', token);

            if(props.list === 'visti' && props.token){
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
        }

    }, [props.trigger, props.list, token]);

    return (
        (props.trigger) ? (

        <div className='overlay'>

            <div className="popup">
                    <button className="close-btn" onClick={() => props.setTrigger(false)}> <FontAwesomeIcon icon={faTimes} /> </button>

                    {
                        props.type==="Crea-partita" &&
                        <>
                        <div className="contenitore-crea">
                            <div className='titolo-popup'>
                                <h1> Impostazioni Partita </h1>
                            </div>
                            <div className='gioca-con'>
                                <FontAwesomeIcon icon={faFilm} className='gioca-con-icon'/>
                                <h2> Gioca con </h2>
                                <Dropdown/>
                            </div>
                            <div className='nome-partita'>
                                <FontAwesomeIcon icon={faEdit} className='nome-partita-icon'/>
                                <input type="text" placeholder="Inserire NomePartita-XXXXX" />
                            </div>
                            <div className='crea-partita'>
                                <Button variant="primary" className='crea-button' onClick={()=> navigate('/gameRoom/lobby')}>
                                    <h2 className='titolo-bottone-crea'>Crea Partita</h2>
                                </Button>
                            </div>                      
                        </div>
                            
                        </>
                    }

                    {
                        props.type==="Partecipa-a-partita" &&
                        <>
                        <div className="contenitore-partecipa">
                            <div className="titolo-popup">
                                <h1> Inserisci codice </h1>
                            </div>
                            <div className='codice-partita'>
                                <FontAwesomeIcon icon={faTicket} className='codice-partita-icon'/>
                                <input type="text" placeholder="NomePartita-XXXXX" />
                            </div>
                            <div className='partecipa-partita'>
                                <Button variant="primary" className='partecipa-button' onClick={()=> navigate('/gameRoom/lobby')}> 
                                    <h2>Partecipa a partita</h2>
                                </Button>
                            </div>
                        </div> 
                        </>
                    }

                    {
                        props.type==="Impostazioni-partita" && 
                        <>
                        <div className="contenitore-impostazioni">
                            <div className="titolo-popup">
                                <h1>Seleziona Film/Generi</h1>
                            </div>
                            <div className='lista-elementi'>
                                <div className='container-elementi'>
                                    <ListGroup className='lista-film'>
                                        {films.map((film) => (
                                            <ListGroup.Item key={film.id} className='lista-film-item'>
                                                <div className='film-item' key={film.id}>
                                                    <img src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title}/> 
                                                </div>
                                                <p>{film.title}</p>
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedFilms.includes(film.id)} 
                                                    onChange={() => handleCheckboxChange(film.id)} 
                                                />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>    
                                </div>                       
                            </div>
                            <div className='invia-impostazioni'>
                                <Button variant="primary" className='impostazioni-button' onClick={()=> navigate('/gameRoom/lobby')}> 
                                    <h2>Conferma</h2>
                                </Button>
                            </div>
                        </div> 
                        </>

                    }

            </div>
        </div>
        ) : ""
    );
}

export default Popup;