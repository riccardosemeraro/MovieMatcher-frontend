import axios from 'axios';
import { React, useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck, faTimes, faHeart, faH } from '@fortawesome/free-solid-svg-icons';

import MovieSlider from '../components/MovieSlider';




function FilmPage() {

    const { idName } = useParams(); //per predenre i parametri dall'url con i :nomeParametro

    const [film, setFilm] = useState([]);
    const [data, setData] = useState([]);
    const [italianReleaseDate, setItalianReleaseDate] = useState('');

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
   
    const chiaveAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0";
    const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + chiaveAPI } };

    useEffect(() => {
        //richiesta TMDB per le info del film e le date di uscita
        const fetchFilmData = async () => {
            try {
                const [filmResponse, releaseDatesResponse] = await Promise.all([
                    axios.get('https://api.themoviedb.org/3/movie/' + id + '?language=it-IT', options),
                    axios.get('https://api.themoviedb.org/3/movie/' + id + '/release_dates', options)
                    ]);
    
                setFilm(filmResponse.data);
                console.log(filmResponse.data);
    
                setData(releaseDatesResponse.data.results);
                console.log(releaseDatesResponse.data.results);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchFilmData();

        window.scrollTo(0, 0); //per far tornare la pagina in alto quando si carica

    }, [id]);

    const voto = Math.floor(film.vote_average * 100)/100;

    //voglio accedere alla data italiana di uscita del film
    let italianDate = "";
    useEffect(() => {
        if (data.length > 0) {
            italianDate = data.find(release => release.iso_3166_1 === 'IT');
            if (italianDate && italianDate.release_dates.length > 0) {
                italianDate = italianDate.release_dates[0].release_date.slice(0, 10); // Prendi solo la parte della data
                italianDate = italianDate.split('-').reverse().join('/'); // Formatta la data in gg/mm/aaaa
                console.log('Data di uscita in Italia:', italianReleaseDate);
                setItalianReleaseDate(italianDate);
            }
        }
    }, [data]);

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
        <>
        
        <style>
            {`

                /*per desktop */
                @media (min-width: 1024px){

                    .desktop-page {
                        display: flex;
                        flex-direction: column;

                        background-size: cover; /* Assicura che l'immagine di sfondo copra tutto il div */
                        background-position: center; /* Centra l'immagine di sfondo */
                        background-repeat: no-repeat; /* Evita che l'immagine di sfondo si ripeta */
                    }

                    .mobile-page{
                        display: none;
                    }

                    .content-wrapper {
                        display: flex;
                        flex-direction: column;
                    }

                    .container {
                        display: flex;
                    }

                    .film-image {
                        width: 360px;
                        height: auto;
                        background-color: #f5f5f5;
                        border-radius: 20px;
                        padding: 2px;      
                        margin-bottom: 10px;
                        margin-top: 10px;
                        margin-right:20px;
                        margin-left: 20px;

                        flex: 0 0 auto;
                    }

                    .film-image img {
                        width: 100%;
                        height: 100%;
                        border-radius: 20px;
                    }


                    .info-film {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start; /* Posiziona tutti i figli all'inizio del div */
                        margin-top: 10px;
                        margin-right: 20px;
                        margin-left: 20px;
                        margin-bottom: 10px;
                    }
                
                    h1 {
                        color: white;
                        text-align: start;
                        margin: 0px;

                        font-size: 36px;

                        text-shadow: 
                            1px 1px 0 #6a0795,  /* Ombra in basso a destra */
                            -1px 1px 0 #6a0795, /* Ombra in basso a sinistra */
                            1px -1px 0 #6a0795, /* Ombra in alto a destra */
                            -1px -1px 0 #6a0795;/* Ombra in alto a sinistra */

                    }

                    p {
                        color: white;
                        text-align: center;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        margin-left: 10px;
                        margin-right: 10px;

                        font-size: 16px;
                    }

                    .info-container {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        justify-content: flex-start;
                    }

                    .info {
                        display: flex;
                        flex-direction: column;
                    }

                    .generi{
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        padding: 5px;
                        display: inline-block;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        margin-left: 0px;
                        margin-right: 0px;
                    }

                    .data {
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        padding: 5px;
                        display: inline-block;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        margin-left: 0px;
                        margin-right: 0px;
                    }

                    .voto {
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        padding: 5px;
                        display: inline-block;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        margin-left: 0px;
                        margin-right: 0px;
                    }

                    .bottoni {
                        
                        display: flex;
                        flex-direction: column;
                    }

                    .custom-button {
                        background-color: #6a0795;

                        color: white;
                        text-transform: none;
                        font-size: 16px;
                        
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        

                        margin-left: 80px;
                        margin-right: 80px;
                        margin-top: 20px;
                        margin-bottom: 20px;

                        border-radius: 20px;
                        padding: 5px;

                        flex: 1;
                        width: 100%;
                    }

                    .custom-button p {
                        margin: 0px;
                    }


                    .icon {
                        font-size: auto;
                    }

                    .descrizione {
                        
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        margin-left: 0px;
                        margin-right: 0px;
                        margin-bottom: 0px;
                        margin-top: 10px;

                        padding: 5px;
                    }

                    .text-descrizione {
                        color: white;
                        text-align: justify;
                        margin: 10px ;
                        font-size: 18px;
                    }

                    .no-color-change {
                        background-color: #6a0795 !important;
                        color: white !important;
                    }

                }

                /*per mobile */
                @media (max-width: 1023px){

                    .mobile-page{
                        display: block; //no flex perche scompiglia tutto
                        width: 100vw;
                        height: auto;
                        box-sizing: border-box;

                        border-radius: 20px;
                        margin-left: 10px;
                        margin-right: 10px;
                        margin-top: -10px;
                        border: 2px solid white;

                        
                        background-size: cover; /* Assicura che l'immagine di sfondo copra tutto il div */
                        background-position: center; /* Centra l'immagine di sfondo */
                        background-repeat: no-repeat; /* Evita che l'immagine di sfondo si ripeta */

                        }

                    .desktop-page{
                        display: none;
                    }

                    h1 {
                        color: white;
                        text-align: center;
                        margin:10px;

                        text-shadow: 
                            1px 1px 0 #6a0795,  /* Ombra in basso a destra */
                            -1px 1px 0 #6a0795, /* Ombra in basso a sinistra */
                            1px -1px 0 #6a0795, /* Ombra in alto a destra */
                            -1px -1px 0 #6a0795;/* Ombra in alto a sinistra */
                    }

                    p {
                        color: white;
                        text-align: center;
                        margin: 0px;
                        margin-bottom: 0px;

                        font-size: 16px;
                    }

                    .generi{
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        padding: 10px;
                        display: inline-block;
                    }

                    .info-film-container{
                        display: flex;
                        flex-direction: row;
                        justify-content: center; //center da mettere su cell, flex-start su desktop (probabile) - al momento è ok per entrambi fit-content finche non si fa la distinzione
                        align-items: center;                        
                        margin-left: 10px;
                        margin-right: 10px;

                    }
                
                    .film-image {
                        flex: 0 0 auto;
                        width: 200px;
                        height: auto;
                        background-color: #f5f5f5;
                        border-radius: 20px;
                        padding: 2px;      
                        margin-bottom: 10px;
                        margin-right: 5px;
                        margin-left: 0px;
                        margin-top: 10px;
                    }

                    .film-image img {
                        width: 100%;
                        height: 100%;
                        border-radius: 20px;
                    }

                    .info-film{
                        color: white;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 10px;
                        margin-left: 5px;
                        margin-right: 0px;
                        margin-top: 5px;

                        width: auto;
                        height: auto;
                    }

                    .info {
                        background-color: #6a0795;

                        color: white;
                        font-size: 16px;
                        flex-direction: column;
                        
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        

                        margin: 5px;
                        border-radius: 20px;
                        padding: 5px;

                        flex: 1;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .custom-button {
                        background-color: #6a0795;

                        color: white;
                        text-transform: none;
                        font-size: 16px;
                        
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        

                        margin: 5px;
                        border-radius: 20px;
                        padding: 5px;

                        flex: 1;
                        width: 100%;
                    }

                    .custom-button p {
                        margin: 0px;
                    }

                    .icon {
                        font-size: auto;
                    }

                    .descrizione {
                        margin-bottom: 10px;
                        background-color: #6a0795;
                        color: white;
                        border-radius: 20px;

                        margin-left: 10px;
                        margin-right: 10px;

                        padding: 5px;
                    }

                    .text-descrizione {
                        color: white;
                        text-align: justify;
                        margin: 10px ;
                        font-size: 18px;
                    }

                    .no-color-change {
                        background-color: #6a0795 !important;
                        color: white !important;
                    }

                }                   

            `}

        </style>

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
                                        film.genres &&
                                        <p>{film.genres.map(genre => genre.name).sort().join(', ')}</p>
                                    }
                                </div>
                                <div className='data'>
                                    <p>Data di uscita: {italianReleaseDate || film.release_date }</p>
                                </div>
                                <div className='voto'>
                                    <p>Voto: {voto}/10</p>
                                </div>
                            </div>
                            <div className='bottoni'>
                                <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_1(!add_remove_1)}> 
                                        <p> <FontAwesomeIcon icon={add_remove_1 ? faCheck : faTimes} /> 
                                        &nbsp; {add_remove_1 ? "Aggiungi ai " : "Rimuovi dai "} Film Visti</p>
                                </Button>
                                <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_2(!add_remove_2)}> 
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
                            film.genres &&
                            <p>{film.genres.map(genre => genre.name).sort().join(', ')}</p>
            }
            </div>
            <div className='info-film-container' >
                <div className='film-image'>
                    <img src={'https://image.tmdb.org/t/p/w500'+film.poster_path} alt={film.title} />
                </div>
                <div className='info-film'>
                    <div className='info'>
                        <p >{italianReleaseDate || film.release_date} </p>
                        <p>Voto: {voto}/10</p>
                    </div>
                    <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_1(!add_remove_1)}> 
                        <p> <FontAwesomeIcon icon={add_remove_1 ? faCheck : faTimes} /> 
                        &nbsp; {add_remove_1 ? "Aggiungi ai " : "Rimuovi dai "} <br/>Film visti</p>
                    </Button>
                    <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_2(!add_remove_2)}> 
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