import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import MovieSlider from '../components/MovieSlider';
import '../style/filmPage.css';

import LoadingGif from '../components/loadingGif';




function FilmPage() {

    const { idName } = useParams(); //per predenre i parametri dall'url con i :nomeParametro

    const [film, setFilm] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [add_remove_1, setAdd_remove_1] = useState(true);
    const [add_remove_2, setAdd_remove_2] = useState(true);

    /* per prendere le cose dalle query dall'url
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    console.log(query.get('id')); //per prendere le cose dalle query dall'url
    */

    const id = idName.split('-')[0]; //per prendere l'id del film dalla stringa
    //const name = idName.split('-').slice(1).join(' '); //per prendere il nome del film dalla stringa

    console.log(idName);
    console.log("ID del film: " + id);
   
    useEffect(() => {
        //richiesta TMDB per le info del film e le date di uscita

        axios.get('https://moviematcher-backend.onrender.com/tmdb/filmPage/' + id)
            .then(response => {
                //in response.data.id c'è l'id del film richiesto
                console.log("Informazioni ricevute sul film richiesto: ", response.data);
                setFilm(response.data.movie);
            })
            .catch(err => {
                console.error('Errore nella richiesta del film:', err);
            })
            .finally(() => {
                setLoading(false);
                //setTimeout(() => setLoading(false), 3005); //time_max: 3200ms per la durata della gif
            });

        window.scrollTo(0, 0); //per far tornare la pagina in alto quando si carica

    }, [id]);

    /*
    {
        "backdrop_path": "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
        "genres": [
            {
                "id": 16,
                "name": "Animazione"
            },
            {
                "id": 10751,
                "name": "Famiglia"
            },
            {
                "id": 35,
                "name": "Commedia"
            },
            {
                "id": 28,
                "name": "Azione"
            }
        ],
        "id": 519182,
        "overview": "Gru e Lucy e le loro figlie - Margo, Edith e Agnes - accolgono un nuovo membro nella famiglia, Gru Jr., deciso a far disperare suo padre. Gru affronta un nuovo nemico, Maxime Le Mal e la fidanzata, la femme fatale Valentina, per cui la famiglia sarà costretta alla fuga.",
        "poster_path": "/898BC1HabQvEphWLhuhXY6ui5SG.jpg",
        "title": "Cattivissimo me 4",
        "vote_average": 7.3,    }

        per la data utilizza altra axios.get
    */

    return (
        (loading) ? 
                <div>
                    <>
                        <LoadingGif />
                    </>    
                </div> : 
            <>
                <div className='desktop-page' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})` }}>
                    <div className='content-wrapper'>
                        <div className='container'>
                            <div className='film-image'>
                                <img src={'https://image.tmdb.org/t/p/w500'+film.poster_path} alt={film.title} />
                            </div>
                            <div className='info-film'>
                                <h1>{film.title}</h1>
                                <div className='info-container'>
                                    <div className='info'>
                                        <div className='generi'>
                                            {
                                                (film.genres && film.genres.length>0) ? (
                                                    film.genres &&
                                                    <p>{film.genres.map(genre => genre.name).sort().join(', ')}</p> ) : "Nessun genere collegato..."
                                            }
                                        </div>
                                        <div className='data'>
                                            <p>Data di uscita: {film.release_date }</p>
                                        </div>
                                        <div className='voto'>
                                            <p>Voto: {film.vote}/10</p>
                                        </div>
                                    </div>
                                    <div className='bottoni'>
                                        <Button variant="primary" className='custom-button' onClick={() => setAdd_remove_1(!add_remove_1)}> 
                                                <p> <FontAwesomeIcon icon={add_remove_1 ? faCheck : faTimes} /> 
                                                &nbsp; {add_remove_1 ? "Aggiungi ai " : "Rimuovi dai "} Film Visti</p>
                                        </Button>
                                        <Button variant="primary" className='custom-button' onClick={() => setAdd_remove_2(!add_remove_2)}> 
                                                <p> <FontAwesomeIcon icon={add_remove_2 ? faBookmark : faTimes} /> 
                                                &nbsp; {add_remove_2 ? "Aggiungi ai " : "Rimuovi dai "} Film da Vedere</p>
                                        </Button>
                                    </div>
                                </div>
                                <div className='descrizione'>
                                    <p className='text-descrizione'>{(film.overview && film.overview.length>0) ? film.overview : "Spiacenti, ma la descrizione non è ancora disponibile..."}</p>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <MovieSlider type="similar" id={id}/>             
                </div>
                
                <div className='mobile-page' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`} }>
                    <h1>{film.title}</h1>
                    <div className='generi'>
                    {
                        (film.genres && film.genres.length>0) ? (
                            film.genres && <p>{film.genres.map(genre => genre.name).sort().join(', ')}</p> ) :
                            "Nessun genere collegato..."
                    }
                    </div>
                    <div className='info-film-container' >
                        <div className='film-image'>
                            <img src={'https://image.tmdb.org/t/p/w500'+film.poster_path} alt={film.title} />
                        </div>
                        <div className='info-film'>
                            <div className='info'>
                                <p>Uscita: <br/>{film.release_date} </p>
                                <p>Voto: {film.vote}/10</p>
                            </div>
                            <Button variant="contained" className='custom-button' onClick={() => setAdd_remove_1(!add_remove_1)}> 
                                <p> <FontAwesomeIcon icon={add_remove_1 ? faCheck : faTimes} /> 
                                &nbsp; {add_remove_1 ? "Aggiungi ai " : "Rimuovi dai "} <br/> Film visti</p>
                            </Button>
                            <Button variant="contained" className='custom-button' onClick={() => setAdd_remove_2(!add_remove_2)}> 
                                <p> <FontAwesomeIcon icon={add_remove_2 ? faBookmark : faTimes} /> 
                                &nbsp; {add_remove_2 ? "Aggiungi ai " : "Rimuovi dai "} <br/>Film da Vedere </p>
                            </Button>
                        </div>            
                    </div>
                    <div className='descrizione'>
                            <p className='text-descrizione'>{(film.overview && film.overview.length>0) ? film.overview : "Spiacenti, ma la descrizione non è ancora disponibile..."}</p>
                    </div>
                    <MovieSlider type="similar" id={id}/>
                </div>
            </>
    );
}

export default FilmPage;
