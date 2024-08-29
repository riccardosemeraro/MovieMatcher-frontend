import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/header.css';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons';

import { ServerStateContext } from '../contexts/serverStateContextProvider';



function Header() {

  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

  const [lock, setLock] = useState(true);

  const location = useLocation();

  const { isAuthenticated } = useAuth0();

  useEffect(() => {

    if (location.pathname === '/gameRoom/matchRoom') {
      setLock(true);
    }else setLock(!server); // setto il lock in base allo stato del server

  }, [location, server]);


  return (
    <header className="app-header">

      <div className="desktop-header">
        <div className="top">

          <Link to="/" >Movie<img src={logo} className="logoImg" alt="logo" />Matcher</Link>
          <ul className = {lock ? 'locked' : ''}>
            <li className = {location.pathname === "/" ? 'active' : ''} >  
                <Link to="/" > <FontAwesomeIcon icon={faHome} className='icon'/> Home</Link> 
              </li>
            <li  className = {location.pathname === "/gameRoom" || location.pathname === "/gameRoom/lobby"  ? 'active' : ''} > 
                <Link to="/gameRoom" > <FontAwesomeIcon icon={faGamepad} className='icon' /> Game Room</Link> 
            </li>
            <li  className = {location.pathname === "/profile" ? 'active' : ''} > 
                <Link to="/profile" > <FontAwesomeIcon icon={faUser} className='icon' /> Profilo</Link>
            </li>
          </ul>

        </div>
      </div>

      <div className="mobile-header">
        <div className="top">
          <Link to="/" className="logo">Movie<img src={logo} className="logoImg" alt="logo" />Matcher</Link>    
        </div>

        {location.pathname !== '/gameRoom/matchRoom' && (
        <div className="bottom">
          <nav className="nav-bottom">
            <ul className = {lock ? 'locked' : ''}>
              <li  className = {location.pathname === "/" ? 'active' : ''} > 
                <Link to="/"><FontAwesomeIcon icon={faHome}/></Link> 
              </li>
              <li  className = {location.pathname === "/gameRoom" || location.pathname === "/gameRoom/lobby" || location.pathname === "/gameRoom/matchRoom" ? 'active' : ''} > 
                <Link to="/gameRoom"><FontAwesomeIcon icon={faGamepad}/></Link> 
              </li>
              <li  className = {location.pathname === "/profile" ? 'active' : ''} >
                <Link to="/profile"><FontAwesomeIcon icon={faUser}/></Link> 
              </li>
            </ul>
        </nav>
        </div> 
        )}
      </div>
    </header>
  );
}

export default Header;