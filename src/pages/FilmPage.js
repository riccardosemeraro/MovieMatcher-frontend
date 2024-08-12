import axios from 'axios';
import { React, useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';




function FilmPage() {

    const { idName } = useParams(); //per predenre i parametri dall'url con i :nomeParametro

    const [film, setFilm] = useState([]);
    const [data, setData] = useState([]);
    const [italianReleaseDate, setItalianReleaseDate] = useState('');

    const [add_remove_1, setAdd_remove_1] = useState(false);
    const [add_remove_2, setAdd_remove_2] = useState(false);

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
    }, [id]);

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

                /*per mobile @media (max-width: 1023px){}*/
                /*per desktop @media (min-width: 1024px){}*/

                h1 {
                    color: white;
                    text-align: center;
                    margin:10px;
                }

                p {
                    color: white;
                    text-align: center;
                    margin: 0px;
                    margin-bottom: 10px;

                    font-size: 16px;
                }

                .data-generi {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                .info-film-container{
                    display: flex;
                    flex-direction: row;
                    justify-content: fit-content; //center da mettere su cell, flex-start su desktop (probabile) - al momento è ok per entrambi fit-content finche non si fa la distinzione
                    align-items: center;

                }
            
                .film {
                    flex: 0 0 auto;
                    width: 200px;
                    height: auto;
                    background-color: #f5f5f5;
                    border-radius: 20px;
                    padding: 2px;      
                    margin-bottom: 10px;
                    margin-right: 2px;
                    margin-left: 8px;

                }

                .film img {
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
                    margin-right: 8px;
                    margin-left: 2px;
                }

                .custom-button {
                    background-color: #6a0795;

                    color: white;
                    text-transform: none;
                    font-size: 16px;
                    
                    display: flex;
                    flex-direction: row;
                    text-align: center;
                    justify-content: center;

                    margin: 5px;
                    border-radius: 20px;
                    padding: 5px;

                    flex: 1;
                    width: 100%;
                }

                .icon {
                    font-size: auto;
                }

                .descrizione {
                    margin-bottom: 40px;
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
                        
                

            `}

        </style>


        <h1>{film.title}</h1>
        

        <div className='info-film-container'>
            <div className='film'>
                <img src={'https://image.tmdb.org/t/p/w500'+film.poster_path} alt={film.title} />
            </div>
            
            <div className='info-film'>

                <p>Data di uscita: <br/> {italianReleaseDate || film.release_date}</p>
                {
                    film.genres &&
                    <p>Generi: <br/> {film.genres.map(genre => genre.name).sort().join(', ')}</p>
                }

                <p>Valutazione: <br/> {film.vote_average}</p>
                <p>Liste Film:</p>
                <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_1(!add_remove_1)}> 
                        &nbsp; <FontAwesomeIcon icon={add_remove_1 ? faCheck : faTimes} /> &nbsp; Visti
                </Button>
                <Button variant="contained" className='custom-button no-color-change' onClick={() => setAdd_remove_2(!add_remove_2)}> 
                        &nbsp; <FontAwesomeIcon icon={add_remove_2 ? faCheck : faTimes} /> &nbsp; Da vedere
                </Button>
            </div>            
        </div>
        <div className='descrizione'>
                <p className='text-descrizione'>{film.overview}</p>
        </div>

        </>
    );
}

export default FilmPage;