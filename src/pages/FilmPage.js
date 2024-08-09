import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


function FilmPage() {

    const { id, ciao } = useParams(); //per predenre i parametri dall'url con i :nomeParametro

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    console.log(query.get('id')); //per prendere le cose dalle query dall'url


    return (
        <div>
        <h1>Film Page {id} {ciao}</h1>
        </div>
    );
}

export default FilmPage;