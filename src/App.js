import './App.css';


import { Navigate, BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GameRoomPage from './pages/GameRoomPage';

import LobbyPage from './pages/LobbyPage';
import MatchRoomPage from './pages/MatchRoomPage';

import AuthenticationGuard from './authenticationGard'; //importo il componente per la protezione delle rotte
import Header from './components/header';
import Footer from './components/footer';
import Popup from './components/Popup';
import FilmPage from './pages/FilmPage';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import { ServerStateContext } from './contexts/serverStateContextProvider';

import { ActiveGameContextProvider } from './contexts/activeGameContextProvider'; //importo il provider dei contesti server

function App() {

  const location = useLocation(); //per prendere la locazione della pagina

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server
  const [ authToken, setAuthToken ] = useState('');

  useEffect(() => { //funzione per controllare se il server è raggiungibile //DA CONTROLLARE

    const serverCheck = () => { //funzione per controllare se il server è raggiungibile

      console.log('Controllo del server');
      axios.get('https://moviematcher-backend.onrender.com/') //http://localhost:9000/
        .then((response) => {
          console.log('Risposta dal Backend Check:', response);
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

  }, [location]); //ogni volta che viene renderizzato, viene chiamato lo UseEffect


  useEffect(() => { //funzione per controllare se l'utente è registrato 

    console.log('AUTENTICATO: ' + isAuthenticated);


    if(isAuthenticated && server)
      {

        console.log('Utente autenticato da Auth0');
        getAccessTokenSilently()
          .then( (token) => {
            console.log("Invio della POST per la verifica dell'utente");
            axios.post('https://moviematcher-backend.onrender.com/user/verify', { body:JSON.stringify(user)}, {headers: {Authorization: 'Bearer '+token} })
              .then((response) => {
                console.log("Successo, l'utente è registrato:", response);
                setAuthToken(token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
              })
              .catch((error) => {
                console.error('Errore nella verifica del login al backend:', error);
              });
  
          })
          .catch(err => {
            console.error('Errore nella richiesta del token:', err);
          });
      } else {
        console.log('Nessun Utente autenticato da Auth0');
      }
    
  }, [server, isAuthenticated]); //ogni volta che cambia, viene chiamato lo UseEffect

  return (

    
    <>    
      {console.log('Server nel contesto:', server)}

      <div className="App">

        {/*<Router> l'ho spostato dentro index.js per acquisire la location e far eseguire lo useState solo quando cambia l'url*/}

        <Header />

          <div className='content'>
            <Routes>
              {/* quando leggi la wildcard reindirizzami alla root*/}
              <Route path="/*" element={<Navigate to="/" />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<AuthenticationGuard component={() => <ProfilePage token={authToken} />} />} />
              

              <Route path="/gameRoom" element={<ActiveGameContextProvider><AuthenticationGuard component={GameRoomPage} /></ActiveGameContextProvider>} />
              <Route path="/gameRoom/lobby" element={<ActiveGameContextProvider><AuthenticationGuard component={() => <LobbyPage token={authToken} />} /></ActiveGameContextProvider>} />
              <Route path="/gameRoom/matchRoom" element={<ActiveGameContextProvider><AuthenticationGuard component={MatchRoomPage} /></ActiveGameContextProvider>} />

              {/*<Route path="/gameRoom-invite" element={<ActiveGameContextProvider><AuthenticationGuard component={GameRoomInvite}/></ActiveGameContextProvider>}/>*/}
              <Route path="/gameRoom-invite" element={<ActiveGameContextProvider><AuthenticationGuard component={() => <GameRoomPage invite={true} />} /></ActiveGameContextProvider>} />

              <Route path="/film/:idName" element={<FilmPage token={authToken}/>} />
              

              {/* Aggiungi altre route qui */}
            </Routes>
          </div>

          {location.pathname !== '/gameRoom/lobby' && location.pathname !== '/gameRoom/matchRoom' && <Footer />}

        {/*<Router> l'ho spostato dentro index.js per acquisire la location e far eseguire lo useState solo quando cambia l'url*/}

      </div>
    </>
    
  );
}

export default App;




/* Cose per frontend:
https://react-bootstrap.netlify.app
https://mui.com/material-ui/getting-started/templates/
https://getbootstrap.com/docs/5.0/getting-started/introduction/#starter-template
https://mui.com/material-ui/getting-started/templates/
*/
