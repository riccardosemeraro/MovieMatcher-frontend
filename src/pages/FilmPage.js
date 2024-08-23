import axios from 'axios';
import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import MovieSlider from '../components/MovieSlider';
import '../style/filmPage.css';

import LoadingGif from '../components/loadingGif';

import { ServerStateContext } from '../contexts/serverStateContextProvider';


function FilmPage({token, userSub}) {

    const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

    const { idName } = useParams(); //per predenre i parametri dall'url con i :nomeParametro

    const [film, setFilm] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [addRemoveVisti, setaddRemoveVisti] = useState(true);
    const [addRemoveVedere, setaddRemoveVedere] = useState(true);

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
        setLoading(true);
        //richiesta TMDB per le info del film e le date di uscita

        axios.get('https://moviematcher-backend.onrender.com/tmdb/filmPage/' + id)
            .then(response => {
                //in response.data.id c'è l'id del film richiesto
                console.log("Informazioni ricevute sul film richiesto: ", response.data);
                setFilm(response.data.movie);

                const handleFilmCheckList = async (idFilm, lista) => {
                    if (token !== '' && userSub !== ''){

                        const corpo = {
                            userSub: userSub,
                            movieId: idFilm,
                            list: lista
                        };

                        try{
                            const response = await axios.post('https://moviematcher-backend.onrender.com/user/filmCheckList', { body: corpo}, {headers: {Authorization: 'Bearer '+token} });
                            console.log("Richiesta avvenuta con successo:", response);
                            return response.data.value;
                        }
                        catch(err){
                            console.error('Errore nella verifica del film nella lista:', err);
                            return true;
                        }
                    } else {
                        return true;
                    }
                };

                const checkFilmLists = async () => {
                    const visti = await handleFilmCheckList(id, 'visti');
                    setaddRemoveVisti(visti);

                    const vedere = await handleFilmCheckList(id, 'vedere');
                    setaddRemoveVedere(vedere);
                };

                checkFilmLists();

                
            })
            .catch(err => {
                console.error('Errore nella richiesta del film:', err);
            })
            .finally(() => {
                setLoading(false);
                //setTimeout(() => setLoading(false), 3000); //time_max: 3200ms per la durata della gif
            });

        window.scrollTo(0, 0); //per far tornare la pagina in alto quando si carica

    }, [id, userSub]);

    return (
        (!server || loading) ? 
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
                                        <Button variant="primary" className='custom-button' onClick={() => 
                                            {
                                                if (token !== '' && userSub !== ''){
                                                    //handleAggiuntaRimozione(idUser, id, listDaVolerMoficare, stato) lo stato lo richiamo

                                                    if(addRemoveVisti){
                                                        axios.post('https://moviematcher-backend.onrender.com/user/addFilm', { body: {userSub: userSub, movieId: id, list: 'visti'}}, { headers: {Authorization: 'Bearer '+token} })
                                                            .then(response => {
                                                                console.log("Film aggiunto ai visti:", response);
                                                                if(response.data.valueState === true){
                                                                    window.alert("Film già presente in una lista");
                                                                } else {
                                                                setaddRemoveVisti(response.data.valueState);
                                                                }
                                                            })
                                                            .catch(err => {
                                                                console.error("Errore nell'aggiunta del film ai visti:", err);
                                                                window.alert("Errore nell'aggiunta del film ai visti");
                                                            });
                                                    } else {
                                                        axios.post('https://moviematcher-backend.onrender.com/user/removeFilm', { body: {userSub: userSub, movieId: id, list: 'visti'}}, { headers: {Authorization: 'Bearer '+token} })
                                                            .then(response => {
                                                                console.log("Film rimosso dai visti:", response);
                                                                setaddRemoveVisti(response.data.valueState);
                                                            })
                                                            .catch(err => {
                                                                console.error('Errore nella rimozione del film ai visti:', err);
                                                                window.alert("Errore nella rimozione del film ai visti");
                                                            });
                                                    }
                                                } else {
                                                    window.alert("Devi essere loggato per poter aggiungere o rimuovere un film da una lista"); //da cambiare con un popup personalizzato
                                                }
                                                
                                                }}> 
                                                <p> <FontAwesomeIcon icon={addRemoveVisti ? faCheck : faTimes} /> 
                                                &nbsp; {addRemoveVisti ? "Aggiungi ai " : "Rimuovi dai "} Film Visti</p>
                                        </Button>
                                        <Button variant="primary" className='custom-button' onClick={() =>  
                                            {
                                                if (token !== '' && userSub !== ''){
                                                    //handleAggiuntaRimozione(idUser, id, listDaVolerMoficare, stato) lo stato lo richiamo

                                                    if(addRemoveVedere){
                                                        axios.post('https://moviematcher-backend.onrender.com/user/addFilm', { body: {userSub: userSub, movieId: id, list: 'vedere'}}, { headers: {Authorization: 'Bearer '+token} })
                                                            .then(response => {
                                                                console.log("Film aggiunto ai vedere:", response);
                                                                if(response.data.valueState === true){
                                                                    window.alert("Film già presente in una lista");
                                                                } else {
                                                                setaddRemoveVedere(response.data.valueState);
                                                                }
                                                            })
                                                            .catch(err => {
                                                                console.error('Errore nell\'aggiunta del film ai vedere:', err);
                                                                window.alert("Errore nell'aggiunta del film da vedere");
                                                            });
                                                    } else {
                                                        axios.post('https://moviematcher-backend.onrender.com/user/removeFilm', { body: {userSub: userSub, movieId: id, list: 'vedere'}}, { headers: {Authorization: 'Bearer '+token} })
                                                            .then(response => {
                                                                console.log("Film rimosso dai vedere:", response);
                                                                setaddRemoveVedere(response.data.valueState);
                                                            })
                                                            .catch(err => {
                                                                console.error('Errore nella rimozione del film ai vedere:', err);
                                                                window.alert("Errore nella rimozione del film da vedere");
                                                            });
                                                    }
                                                } else {
                                                    window.alert("Devi essere loggato per poter aggiungere o rimuovere un film da una lista"); //da cambiare con un popup personalizzato
                                                }
                                                
                                                }}> 
                                                <p> <FontAwesomeIcon icon={addRemoveVedere ? faBookmark : faTimes} /> 
                                                &nbsp; {addRemoveVedere ? "Aggiungi ai " : "Rimuovi dai "} Film da Vedere</p>
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
                            <Button variant="contained" className='custom-button' onClick={() =>    
                                { 
                                    if (token !== '' && userSub !== ''){
                                        //handleAggiuntaRimozione(idUser, id, listDaVolerMoficare, stato) lo stato lo richiamo

                                        if(addRemoveVisti){
                                            axios.post('https://moviematcher-backend.onrender.com/user/addFilm', { body: {userSub: userSub, movieId: id, list: 'visti'}}, { headers: {Authorization: 'Bearer '+token} })
                                                .then(response => {
                                                    console.log("Film aggiunto ai visti:", response);
                                                    if(response.data.valueState === true){
                                                        window.alert("Film già presente in una lista");
                                                    } else {
                                                    setaddRemoveVisti(response.data.valueState);
                                                    }                                                })
                                                .catch(err => {
                                                    console.error("Errore nell'aggiunta del film ai visti:", err);
                                                    window.alert("Errore nell'aggiunta del film ai visti");
                                                });
                                        } else {
                                            axios.post('https://moviematcher-backend.onrender.com/user/removeFilm', { body: {userSub: userSub, movieId: id, list: 'visti'}}, { headers: {Authorization: 'Bearer '+token} })
                                                .then(response => {
                                                    console.log("Film rimosso dai visti:", response);
                                                    setaddRemoveVisti(response.data.valueState);
                                                })
                                                .catch(err => {
                                                    console.error('Errore nella rimozione del film ai visti:', err);
                                                    window.alert("Errore nella rimozione del film ai visti");
                                                });
                                        }
                                    } else {
                                        window.alert("Devi essere loggato per poter aggiungere o rimuovere un film da una lista"); //da cambiare con un popup personalizzato
                                    }
                                
                                    }}> 
                                <p> <FontAwesomeIcon icon={addRemoveVisti ? faCheck : faTimes} /> 
                                &nbsp; {addRemoveVisti ? "Aggiungi ai " : "Rimuovi dai "} <br/> Film visti</p>
                            </Button>
                            <Button variant="contained" className='custom-button' onClick={() =>    
                                { 
                                    if (token !== '' && userSub !== ''){
                                        //handleAggiuntaRimozione(idUser, id, listDaVolerMoficare, stato) lo stato lo richiamo

                                        if(addRemoveVedere){
                                            axios.post('https://moviematcher-backend.onrender.com/user/addFilm', { body: {userSub: userSub, movieId: id, list: 'vedere'}}, { headers: {Authorization: 'Bearer '+token} })
                                                .then(response => {
                                                    console.log("Film aggiunto ai vedere:", response);
                                                    if(response.data.valueState === true){
                                                        window.alert("Film già presente in una lista");
                                                    } else {
                                                    setaddRemoveVedere(response.data.valueState);
                                                    }                                                })
                                                .catch(err => {
                                                    console.error('Errore nell\'aggiunta del film ai vedere:', err);
                                                    window.alert("Errore nell'aggiunta del film da vedere");
                                                });
                                        } else {
                                            axios.post('https://moviematcher-backend.onrender.com/user/removeFilm', { body: {userSub: userSub, movieId: id, list: 'vedere'}}, { headers: {Authorization: 'Bearer '+token} })
                                                .then(response => {
                                                    console.log("Film rimosso dai vedere:", response);
                                                    setaddRemoveVedere(response.data.valueState);
                                                })
                                                .catch(err => {
                                                    console.error('Errore nella rimozione del film ai vedere:', err);
                                                    window.alert("Errore nella rimozione del film da vedere");
                                                });
                                        }
                                    } else {
                                        window.alert("Devi essere loggato per poter aggiungere o rimuovere un film da una lista"); //da cambiare con un popup personalizzato
                                    }
                                    
                                    }}> 
                                <p> <FontAwesomeIcon icon={addRemoveVedere ? faBookmark : faTimes} /> 
                                &nbsp; {addRemoveVedere ? "Aggiungi ai " : "Rimuovi dai "} <br/>Film da Vedere </p>
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
