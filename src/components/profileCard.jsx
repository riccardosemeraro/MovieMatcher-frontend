//file non piu usato

import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import LogoutButton from './logout-button';
import '../style/profileCard.css';

function ProfileCard() {

  const { user } = useAuth0();

  return (
    <div className="profile-card">
      <div className="profile-info">
        {user && (
          <>
              <img src={user.picture} alt={user.name} style={{ width: '100px', height: '100px' }} />    
              <h2>{user.name}</h2>
          </>
        )}
        <ul>
          <li><Link to="/settings">Info Utente</Link></li>
          <li><Link to="/settings">Film visti</Link></li>
          <li><Link to="/settings">Film da vedere</Link></li>
          <li><Link to="/settings">Generi</Link></li>
          <li><LogoutButton /></li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;