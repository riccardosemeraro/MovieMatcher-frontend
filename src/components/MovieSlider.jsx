import '../style/movieSlider.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';





function MovieSlider({type, id}) {

  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');

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

    /*
    Popular: 'https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1'
    Top Rated: 'https://api.themoviedb.org/3/movie/top_rated?language=it-IT&page=1'
    Now Playing: 'https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1'
    */

    let addedQuery = 'type=' + type + (id ? ('&id=' + id) : '') + (type === 'recommendation' ? ('&user=' + JSON.parse(localStorage.getItem('user')).sub ) : '');

    //console.log(type);
    //console.log(url);

    setFilms([]); //riporta tutto lo slider a sinistra al cambio pagina


     //axios.get(url, options)
     axios.get('https://moviematcher-backend.onrender.com/tmdb/movieSlider?'+addedQuery)
      .then (response => {
        console.log(response);
        setFilms(response.data.movies);
        setTitle(response.data.title);
        //console.log(response.data.results[0]);
      })
      .catch(err => {
        console.error(err);
        setTitle(err.response.data.title);
      });

  }, [id, type]);

  return (
      <>

        <div className="sliderContainer">
            <h2>{title}</h2>

            <div className='slider'>


              {
                (films && films.length > 0 ) ? 
              
                films.map(film => (
                  <div className='film' key={film.id}>
                    <Link to = {'/film/'+film.id+'-'+(film.title).split(" ").join("-")}> <img className = "img" src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title} /> </Link>
                  </div>
                ))

                : <p> Nessun film trovato... </p>
              
              }

            </div>



        </div>

        </>
    );
  }

export default MovieSlider;
