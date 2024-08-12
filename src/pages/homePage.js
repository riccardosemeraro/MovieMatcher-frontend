import React, { useEffect, useState } from 'react';
import LoginButton from '../components/login-button';
import LogoutButton from '../components/logout-button';
import MovieSlider from '../components/MovieSlider';
import '../style/homePage.css';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  //const [isVerified, setIsVerified] = useState(false); //al momento tutto con lo useState è commentato

  useEffect(() => {

    if(!isLoading && isAuthenticated) {
      getAccessTokenSilently()
      .then(token => {

        if (isAuthenticated) { //&& !isVerified
          
          //devo mandare al backedn il token per verificare se l'utente è registrato
          //se non è registrato lo registro

          console.log('Invio della POST');

          //setIsVerified(true);

          axios.post('https:moviematcher-backend.onrender.com/user/verify', { body:JSON.stringify(user)}, {headers: {Authorization: 'Bearer '+token} })
          //.then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        }

      });
  }

  }, [isAuthenticated]); //, isVerified

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className="home-page">

      {/*input type="search" placeholder="Cerca un film" className="search-bar" />*/}

      <MovieSlider type="now_playing"/> {/* da capire se basta 1 "pagina" slider per gestirli entrambi */}
      <MovieSlider type="top_rated"/> {/* da capire se basta 1 "pagina" slider per gestirli entrambi */}

    </div>
  );
}

export default HomePage;