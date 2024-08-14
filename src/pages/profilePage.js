import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/profile';
import '../style/profilePage.css';
import LogoutButton from '../components/logout-button';
import { useAuth0 } from '@auth0/auth0-react';

function ProfilePage() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [view, setView] = useState('profile');

  const [update, setUpdate] = useState(false);

  return (
    <>
    <div className="desktop-page">
      <div className="profile-page">
        <div className="sidebar">
          <ul className="ul-header">
            <li className={view === 'profile' ? 'selected' : ''}>
              <Link to="#" onClick={() => setView('profile')} style={{ display: 'block', width: '100%' }}>Le mie info</Link>
            </li>
            <li className={view === 'list' ? 'selected' : ''}>
              <Link to="#" onClick={() => setView('list')} style={{ display: 'block', width: '100%' }}>Le mie liste</Link>
            </li>
            <li className={view === 'genres' ? 'selected' : ''}>
              <Link to="#" onClick={() => setView('genres')} style={{ display: 'block', width: '100%' }}>I miei Generi</Link>
            </li>
          </ul>
        </div>
        
        {
          view === 'profile' && <div className="profile-card">
            <div className="profile-info">
              {user && (
                <>    
                    <ul className='ul-info'>
                      <li>
                        <div className='li-content'>
                          <a>Username: &nbsp;</a>
                          <input type="text" value={" "+user.nickname} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input type="text" value={" "+user.email} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Nome: &nbsp;</a>
                          <input type="text" value={" "+user.given_name} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Cognome: &nbsp;</a>
                          <input type="text" value={" "+user.family_name} disabled={!update}/>
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <Link to="#" onClick={() => setUpdate(!update)} style={{ display: 'block', width: '100%' }}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </Link>
                      </li>
                      <li>
                        <LogoutButton/>
                      </li>
                    </ul>
                </>
              )}
            </div>
          </div>
        }
        {view === 'list' && <div style={{ color: '#FFFFFF' }}>Liste FIlm</div>}
        {view === 'genres' && <div style={{ color: '#FFFFFF' }}>Generi Content</div>}
      </div>
    </div>

    <div className="mobile-page">
      <div className="profile-page">
        <ul className="ul-header">
          <li className={view === 'profile' ? 'selected' : ''}>
            <Link to="#" onClick={() => setView('profile')} style={{ display: 'block', width: '100%' }}>Le mie info</Link>
          </li>
          <li className={view === 'list' ? 'selected' : ''}>
            <Link to="#" onClick={() => setView('list')} style={{ display: 'block', width: '100%' }}>Le mie liste</Link>
          </li>
          <li className={view === 'genres' ? 'selected' : ''}>
            <Link to="#" onClick={() => setView('genres')} style={{ display: 'block', width: '100%' }}>I miei Generi</Link>
          </li>
        </ul>
        
        {
          view === 'profile' && <div className="profile-card">
            <div className="profile-info">
              {user && (
                <>    
                    <ul className='ul-info'>
                      <li>
                        <div className='li-content'>
                          <a>Username: &nbsp;</a>
                          <input type="text" value={" "+user.nickname} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input type="text" value={" "+user.email} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Nome: &nbsp;</a>
                          <input type="text" value={" "+user.given_name} disabled={!update} />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Cognome: &nbsp;</a>
                          <input type="text" value={" "+user.family_name} disabled={!update}/>
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <Link to="#" onClick={() => setUpdate(!update)} style={{ display: 'block', width: '100%' }}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </Link>
                      </li>
                      <li>
                        <LogoutButton/>
                      </li>
                    </ul>
                </>
              )}
            </div>
          </div>
        }
        {view === 'list' && <div style={{ color: '#FFFFFF' }}>Liste FIlm</div>}
        {view === 'genres' && <div style={{ color: '#FFFFFF' }}>Generi Content</div>}
      </div>
    </div>
    </>
  );
}

export default ProfilePage;