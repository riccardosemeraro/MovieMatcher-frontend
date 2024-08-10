import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/profile';
import '../style/profilePage.css';
import LogoutButton from '../components/logout-button';
import { useAuth0 } from '@auth0/auth0-react';

function ProfilePage() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [view, setView] = useState('profile');

  return (
    <>
    
    <div className="profile-page">
      <ul className="ul-header">
        <li className={view === 'profile' ? 'selected' : ''}>
          <Link to="#" onClick={() => setView('profile')}>Le mie info</Link>
        </li>
        <li className={view === 'list' ? 'selected' : ''}>
          <Link to="#" onClick={() => setView('list')}>Le mie liste</Link>
        </li>
        <li className={view === 'genres' ? 'selected' : ''}>
          <Link to="#" onClick={() => setView('genres')}>I miei Generi</Link>
        </li>
        <li>
          <LogoutButton/>
        </li>
      </ul>
      
      {
        view === 'profile' && <div className="profile-card">
          <div className="profile-info">
            {user && (
              <>    
                  <ul>
                    <li><img src={user.picture} alt={user.name} style={{ width: '100px', height: '100px' }} /></li>
                    <li><a>{user.name}</a></li>
                    <li><a>{user.email}</a></li>
                    <li><a>{user.nickname}</a></li>
                  </ul>
              </>
            )}
          </div>
        </div>
      }
      {view === 'list' && <div style={{ color: '#FFFFFF' }}>Liste FIlm</div>}
      {view === 'genres' && <div style={{ color: '#FFFFFF' }}>Generi Content</div>}
    </div>
    
    {/*codice di prova
    <div className="profile-page">
      <Profile />
    </div>
    */}
    </>
  );
}

export default ProfilePage;