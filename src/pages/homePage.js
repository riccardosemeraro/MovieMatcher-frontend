import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import ProfileCard from '../components/profileCard';
import ActionButtons from '../components/actionButton';
import MatchList from '../components/matchList';
import Footer from '../components/footer';
import Slider from '../components/slider';
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

          axios.post('http://localhost:9000/user/verify', { body:JSON.stringify(user)}, {headers: {Authorization: 'Bearer '+token} })
          .then(response => response.json())
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

  if (!isAuthenticated) {
    return <div>Non sei autenticato</div>;
  }

  return ( isAuthenticated &&
    <div className="home-page">
      <Slider /> {/* da capire se basta 1 "pagina" slider per gestirli entrambi */}
    </div>
  );
}

export default HomePage;