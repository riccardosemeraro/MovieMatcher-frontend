import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../style/profileCard.css";
import { Link } from 'react-router-dom';
import LogoutButton from './logout-button';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [view, setView] = useState('profile');

  const handleClick = (newPage) => {
    setView(newPage);
  };
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    isAuthenticated && (
      <>
      {/*
        <div className="profile-page">
          <ul>
            <li><Link to="#" onClick={() => handleClick('profile')}>Info Utente</Link></li>
            <li><Link to="#" onClick={() => handleClick('watched')}>Film visti</Link></li>
            <li><Link to="#" onClick={() => handleClick('toWatch')}>Film da vedere</Link></li>
            <li><Link to="#" onClick={() => handleClick('genres')}>Generi</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>

            {view === 'profile' && <Profile />}
            {view === 'watched' && <div>Film visti Content</div>}
            {view === 'toWatch' && <div>Film da vedere Content</div>}
            {view === 'genres' && <div>Generi Content</div>}
        </div>
      */}
        {/* https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure#user-profile-attributes */}
        {/*vecchio codice*/}
        <div className="profile-card">
          <div className="profile-info">
            {user && (
              <>    
                  <ul>
                    <li><img src={user.picture} alt={user.name} style={{ width: '100px', height: '100px' }} /></li>
                    <li><a>{user.name}</a></li>
                    <li><a>{user.email}</a></li>
                    <li><a>{user.nickname}</a></li>
                    <li><LogoutButton /></li>
                  </ul>
              </>
            )}
          </div>
        </div>
        {/**/}
      </>
    )
  );
};

export default Profile;