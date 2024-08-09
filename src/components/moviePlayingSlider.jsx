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
            }

            .slider {
              display: flex;

              overflow-x: auto;
              
              
              scroll-snap-type: x mandatory;
              gap: 10px;
              background-color: #003366;

              padding: 10px;

              border-radius: 10px;
            }

            .film {
              flex: 0 0 auto;
              width: 200px;
              height: 300px;
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


/*
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUxNy41NDEyMDMsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vZangTWOxjICVMDKP5tSevGWu3fS_0a_Nd-8GqBheGc'
      }
    };

    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(err => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      <h2>Now Playing</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
*/