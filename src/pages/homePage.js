import React, { useEffect, useState, useContext } from 'react';
import MovieSlider from '../components/MovieSlider';
import SearchBar from '../components/searchBar';
import LoadingGif from '../components/loadingGif';


import '../style/homePage.css';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

import { ServerStateContext } from '../contexts/serverStateContextProvider';


function HomePage() {

  const server = useContext(ServerStateContext); //per accedere al contesto del server

  //const [login, setLogin] = useState(false);

  //const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  /*
  useEffect(() => { //funzione per controllare se il server è raggiungibile //DA CONTROLLARE

    const serverCheck = () => { //funzione per controllare se il server è raggiungibile

      console.log('Controllo del server');
      axios.get('https://moviematcher-backend.onrender.com/') //https://moviematcher-backend.onrender.com/
        .then((response) => {
          console.log('Risposta alla get:', response);
          console.log('Server raggiungibile');
          setServer(true);
        })
        .catch((error) => {
          console.error('Errore alla get:', error);
          console.log('Server non raggiungibile');
          setServer(false);
          setTimeout(serverCheck, 5000); // da cambiare perchè sta da cronometrare la fase di accesione del backend
        });
    };
      
    serverCheck(); //controllo se il server è raggiungibile

  }, []);
  */
  /*
  useEffect(() => {

    if(!isLoading && isAuthenticated && server) { 

      getAccessTokenSilently()
        .then(token => {

          if (isAuthenticated) { 
            
            //devo mandare al backedn il token per verificare se l'utente è registrato
            //se non è registrato lo registro

            console.log('Invio della POST');

            axios.post('https://moviematcher-backend.onrender.com/user/verify', { body:JSON.stringify(user)}, {headers: {Authorization: 'Bearer '+token} })
            //.then(response => response.json())
              .then((response) => {
                console.log('Success:', response);
                setLogin(true);
              })
              .catch((error) => {
                console.error('Error:', error);
                setLogin(false);
              });

        }})
        .catch((error) => {
          console.error('Error:', error); //se c'è un errore nella richiesta
        });
    }

  }, [isAuthenticated, server]);
  */

  /*
  if (isLoading) {
    return <div>Loading...</div>;
  }*/

  return (

    (server) ?

    <div className="home-page">
      
      <SearchBar />

      <MovieSlider type="now_playing"/> 
      <MovieSlider type="top_rated"/>

    </div>

    : <LoadingGif />
  );
}

export default HomePage;