import '../style/slider.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



function MoviePlayingSlider() {

  const [films, setFilms] = useState([]);

  const chiaveAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0";

  useEffect(() => {

      /*
      Attributi di ogni film da TMDB

      adult: false
      backdrop_path: "/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg"
      genre_ids: [28, 35, 878] (3)
      id: 533535
      original_language: "en"
      original_title: "Deadpool & Wolverine"
      overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when hi…"
      popularity: 12303.037
      poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
      release_date: "2024-07-24"
      title: "Deadpool & Wolverine"
      video: false
      vote_average: 7.9
      vote_count: 1542

      'https://image.tmdb.org/t/p/w780' + film.poster_path
      */

    const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + chiaveAPI } };

    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1', options)
      .then (response => {
        setFilms(response.data.results);
        console.log(response.data.results[0]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
      <>
        <style>
          {`
            .sliderContainer {
              width: 95%;
              margin: 0 auto;
              text-align: left;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              color: white;

            }

            .slider {
              display: flex;

              overflow-x: auto;



              scroll-snap-type: x mandatory;
              -webkit-overflow-scrolling: touch;

              gap: 0px;
              
              background-color: #6a0795;
              padding: 10px;
              border-radius: 10px;

              /* Nascondo la scrollbar */
              scrollbar-width: none; /* Per Firefox */
              -ms-overflow-style: none; /* Per Internet Explorer e Edge */
            }

            .slider::-webkit-scrollbar {
              /* Nascondo la scrollbar */
              display: none; /* Per Chrome, Safari e Opera */
            }

            .film {
              flex: 0 0 auto;
              width: 210px;
              height: auto;
              background-color: #f5f5f5;
              border-radius: 10px;
              padding: 2px;      
            }

            .film img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }

            
          `}
        </style>

        <div className="sliderContainer">
            <h2>Film della settimana</h2>

            <div className='slider'>
              {films.map(film => (
                <div className='film' key={film.id}>
                  <img className = "img" src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title} />
                </div>
              ))}

            </div>



        </div>

        </>
    );
  }

export default MoviePlayingSlider;
