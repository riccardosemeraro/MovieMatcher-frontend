/*
import ''; //style

import axios from "axios";
import { useEffect, useState } from "react";

function GenreSlider({ type, token }) {

    const [genre, setGenre] = useState([]);

    useEffect(() => {

        setGenre([]);

        if(type === 'myGenre') {

            axios.get('https://moviematcher-backend.onrender.com/user/getMyGenre', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname }}, { headers: { Authorization: 'Bearer ' + token } })
                .then(response => {
                    console.log('Risposta dal backend: ', response);
                    setGenre(response.data.genres);
                })
                .catch(err => {
                    console.error(err);
                    //da gestire
                });

        } else if(type === 'allGenre') {

            axios.get('https://moviematcher-backend.onrender.com/user/allGenre', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname }}, { headers: { Authorization: 'Bearer ' + token } })
                .then(response => {
                    console.log(response);
                    setGenre(response.data.genres);
                })
                .catch(err => {
                    console.error(err);
                    //da gestire
                });
        }

    }, [type]);    

    return (
        <>

        <div className="sliderContainer">
            <h2>{title}</h2>

            <div className='slider'>


              {
                (genre && genre.length > 0 ) ? 
              
                genre.map(genere => (
                    <p>{genere.name}</p>
                ))

                : <p> Nessun genere trovato... </p>
              
              }

            </div>



        </div>

        </>

    );
    
}

export default GenreSlider;

*/