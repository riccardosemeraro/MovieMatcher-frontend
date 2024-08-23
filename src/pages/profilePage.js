import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../style/profilePage.css';
import LogoutButton from '../components/logout-button';
import { useAuth0 } from '@auth0/auth0-react';
import MovieSlider from '../components/MovieSlider';

function ProfilePage({token}) {

  const navigate = useNavigate();

  const { user } = useAuth0();

  const [view, setView] = useState('profile');

  const [formData, setFormData] = useState({
    email: user.email,
    nick: user.nickname,
    name: user.given_name,
    surname: user.family_name
    // Aggiungi altri campi necessari
  });

  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
    <div className="desktop-page">
      <div className="profile-page">
        <div className="sidebar">
          <ul className="ul-header">
            <li className={view === 'profile' ? 'selected' : ''}>
              <button onClick={() => setView('profile')} style={{ display: 'block', width: '100%' }}>Le mie info</button>
            </li>
            <li className={view === 'list' ? 'selected' : ''}>
              <button onClick={() => setView('list')} style={{ display: 'block', width: '100%' }}>Le mie liste</button>
            </li>
            <li className={view === 'genres' ? 'selected' : ''}>
              <button  onClick={() => setView('genres')} style={{ display: 'block', width: '100%' }}>I miei Generi</button>
            </li>
          </ul>
        </div>
        
        {
          view === 'profile' && <div  className="profile-card">
            <div className="profile-info">
              {user && (
                <>    
                    <ul className='ul-info'>
                      <li>
                        <div className='li-content'>
                          <a>Username: &nbsp;</a>
                          <input
                              type="text" 
                              name="nick"
                              value={formData.nick}
                              disabled={!update} 
                              onChange={handleChange}
                          />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input
                              type="text" 
                              name="email"
                              value={formData.email}
                              disabled={!update} 
                              onChange={handleChange}
                          /> 
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Nome: &nbsp;</a>
                          <input
                              type="text" 
                              name="name"
                              value={formData.name}
                              disabled={!update} 
                              onChange={handleChange}
                          />       
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Cognome: &nbsp;</a>
                          <input
                              type="text" 
                              name="surname"
                              value={formData.surname}
                              disabled={!update} 
                              onChange={handleChange}
                          />
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <button to="#" onClick={() => setUpdate(!update)} style={{ display: 'block', width: '100%' }}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </button>
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
        { view === 'list' && <div style={{ width: 'fit-content', maxWidth:'75%', color: '#FFFFFF' }}> <MovieSlider type="visti" token={token} /> <MovieSlider type='vedere' token={token}/></div> } 
        {view === 'genres' && <div style={{ maxWidth:'75%', color: '#FFFFFF' }}>Generi Content</div>}
      </div>
    </div>

    <div className="mobile-page-profile">
      <div className="profile-page">
        <ul className="ul-header">
          <li className={view === 'profile' ? 'selected' : ''}>
            <button to="#" onClick={() => setView('profile')} style={{ display: 'block', width: '100%' }}>Le mie info</button>
          </li>
          <li className={view === 'list' ? 'selected' : ''}>
            <button to="#" onClick={() => setView('list')} style={{ display: 'block', width: '100%' }}>Le mie liste</button>
          </li>
          <li className={view === 'genres' ? 'selected' : ''}>
            <button to="#" onClick={() => setView('genres')} style={{ display: 'block', width: '100%' }}>I miei Generi</button>
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
                          <input
                              type="text" 
                              name="nick"
                              value={formData.nick}
                              disabled={!update} 
                              onChange={handleChange}
                          />
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input
                              type="text" 
                              name="email"
                              value={formData.email}
                              disabled={!update} 
                              onChange={handleChange}
                          /> 
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Nome: &nbsp;</a>
                          <input
                              type="text" 
                              name="name"
                              value={formData.name}
                              disabled={!update} 
                              onChange={handleChange}
                          />       
                        </div>
                      </li>
                      <li>
                        <div className='li-content'>
                          <a>Cognome: &nbsp;</a>
                          <input
                              type="text" 
                              name="surname"
                              value={formData.surname}
                              disabled={!update} 
                              onChange={handleChange}
                          />
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <button to="#" onClick={() => setUpdate(!update)} style={{ display: 'block', width: '100%' }}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </button>
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
        {
          view === 'list' && <div style={{ color: '#FFFFFF' }}>
            <MovieSlider type="now_playing" />
            <MovieSlider />
          </div>
        }
        {view === 'genres' && <div style={{ color: '#FFFFFF' }}>Generi Content</div>} 
      </div>
    </div>
    </>
  );
}

export default ProfilePage;