import logo from './logo.svg';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './components/profile';
import AuthenticationButton from './components/authentication-button';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import MessagesPage from './pages/messegesPage';
import GameRoomPage from './pages/GameRoomPage';
import SettingsPage from './pages/settingsPage';
import AuthenticationGuard from './authenticationGard'; //importo il componente per la protezione delle rotte
import Header from './components/header';
import Footer from './components/footer';

function App() {

  return (
    <div className="App">

      <Router>

        <Header />

        <div className='content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<AuthenticationGuard component={ProfilePage} />} />
            <Route path="/messages" element={<AuthenticationGuard component={MessagesPage} />} />
            <Route path="/gameRoom" element={<AuthenticationGuard component={GameRoomPage} />} />
            <Route path="/settings" element={<AuthenticationGuard component={SettingsPage} />} />
            {/* Aggiungi altre route qui */}
          </Routes>
        </div>

        <Footer />

      </Router>

      {/*<AuthenticationButton />*/}


    
      {/*<AuthenticationButton />
      <Profile />*/}

    </div>
  );
}

export default App;




/* Cose per frontend:
https://react-bootstrap.netlify.app
https://mui.com/material-ui/getting-started/templates/
https://getbootstrap.com/docs/5.0/getting-started/introduction/#starter-template
https://mui.com/material-ui/getting-started/templates/
*/