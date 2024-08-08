import '../style/slider.css';
import axios from 'axios';

function MoviePlayingSlider() {

   const chiaveAPI = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjAxNjQzNjI0ZGY2OTY5NDMwNTRjMzJkNGY3NmI3ZSIsIm5iZiI6MTcyMzExNTUzMS4zNzI1OTgsInN1YiI6IjY2YjRhNTcyZGUzODU5OGY2YTZkMDBmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjgGj9sr5Euk1A8LEyl4riJw0YthkeujM1mT0rpoiX0";

    const risposta = [];

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + chiaveAPI
        }
      };
      
    
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response => {

            //voglio uno slider formato dagli elementi di response.results

            /*
            response.results.map((film) => {
                risposta.push(
                    <div className="film">
                        <img src={film.poster_path} alt={film.title} />
                        <h3>{film.title}</h3>
                        <p>{film.overview}</p>
                    </div>
                );
            });
            */

            console.log(risposta);
            

        })
        .catch(err => console.error(err));

    

    return (
        <>
        <div className="sliderContainer">
            <h2>Film della settimana</h2>
            <div className="slider">
                <div className="film"> {risposta} </div> {/*array di film*/}
            </div>                
        </div>
        
        {/*
        <div className="sliderContainer">
            <h2>Consigliati per te</h2>
            <div className="slider">
                {/*array di film/}
            </div>                
        </div>
        */}

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