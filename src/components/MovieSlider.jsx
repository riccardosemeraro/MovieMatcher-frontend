import '../style/movieSlider.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




function MovieSlider({type, id}) {

  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');

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

    /*
    Popular: 'https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1'
    Top Rated: 'https://api.themoviedb.org/3/movie/top_rated?language=it-IT&page=1'
    Now Playing: 'https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1'
    */

    let url = '';

    switch (type) {
      case 'popular':
        url = 'https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1';
        setTitle('Film popolari');
        break;
      case 'top_rated':
        url = 'https://api.themoviedb.org/3/movie/top_rated?language=it-IT&page=1';
        setTitle('Film più votati');
        break;
      case 'now_playing':
        url = 'https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1';
        setTitle('Film della settimana');
        break;
      case 'similar':
        url = 'https://api.themoviedb.org/3/movie/'+ id +'/similar?language=it-IT&page=1'
        setTitle('Film simili');
        break;
      default:
        url = 'https://api.themoviedb.org/3/movie/now_playing?language=it-IT&page=1';
        setTitle('Film della settimana');
        break;
    }

    console.log(type);
    console.log(url);


    axios.get(url, options)
      .then (response => {
        setFilms(response.data.results);
        //console.log(response.data.results[0]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
      <>

        <div className="sliderContainer">
            <h2>{title}</h2>

            <div className='slider'>
              {films.map(film => (
                <div className='film' key={film.id}>
                  <Link to = {'/film/'+film.id+'-'+(film.title).split(" ").join("-")}> <img className = "img" src={"https://image.tmdb.org/t/p/w780" + film.poster_path} alt={film.title} /> </Link>
                </div>
              ))}

            </div>



        </div>

        </>
    );
  }

export default MovieSlider;
