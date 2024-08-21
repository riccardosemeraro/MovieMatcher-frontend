import React, { useEffect, useState, useContext } from 'react';
import MovieSlider from '../components/MovieSlider';
import SearchBar from '../components/searchBar';
import LoadingGif from '../components/loadingGif';


import '../style/homePage.css';
import axios from 'axios';

import { useAuth0 } from '@auth0/auth0-react';

import { ServerStateContext } from '../contexts/serverStateContextProvider';


function HomePage() {

  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

  //const [login, setLogin] = useState(false);

  //const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


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