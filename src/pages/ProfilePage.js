import React, { useEffect, useState, useContext} from 'react';

import '../style/profilePage.css';
import LogoutButton from '../components/logout-button';
import MovieSlider from '../components/MovieSlider';
import axios from 'axios';

import LoadingGif from '../components/loadingGif';

import { ServerStateContext } from '../contexts/serverStateContextProvider';

import GenreSlider from '../components/GenreSlider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ProfilePage({token}) {

  const { value: server, setValue: setServer } = useContext(ServerStateContext); //stato del server

  const [view, setView] = useState('profile');

  const [update, setUpdate] = useState(false);

    /*const [formData, setFormData] = useState({
    email: user.email,
    nick: user.nickname,
    name: user.given_name,
    surname: user.family_name
    // Aggiungi altri campi necessari
  });*/

  const [formData, setFormData] = useState({
    email: '',
    nick: '',
    name: '',
    surname: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if(update){
      //console.log('update: ', formData);
      axios.post('https://moviematcher-backend.onrender.com/user/updateUserData',  { body: {sub: JSON.parse(localStorage.getItem('user')).sub, nickname: formData.nick, nome: formData.name, cognome: formData.surname  }}, { headers: {Authorization: 'Bearer '+token} })
        .then(response => {
          console.log('Risposta cambio dati: ', response);
          if(response.status === 200){
            console.log('Modifiche effettuate con successo');
            alert('Modifiche effettuate con successo');
            setUpdate(!update);
          }
          else if (response.status === 201){
            console.log('Username già esistente');
            alert('Username già esistente, scegline un altro!');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Errore nel salvataggio delle modifiche');
        }
      );
    }
    else{
      setUpdate(!update);
    } 
  };


  useEffect(() => {

    if (token !== '') {
      axios.post('https://moviematcher-backend.onrender.com/user/getUserData', { body: {userNickname: JSON.parse(localStorage.getItem('user')).nickname}}, { headers: {Authorization: 'Bearer '+token} })
      .then (response => {
        console.log('Risposta dal backend: ', response);
        setFormData({
          email: response.data.userData.email,
          nick: response.data.userData.username,
          name: response.data.userData.nome,
          surname: response.data.userData.cognome
        } );
        console.log(formData);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }, [token]);




  return (
    (!server) ?
    <div>
        <LoadingGif />  
    </div> :
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
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input
                              type="text" 
                              name="email"
                              value={formData.email}
                              disabled={true} 
                              onChange={handleChange}
                          /> 
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <button to="#" onClick={() => handleUpdate()} style={{ display: 'block', width: '100%' }}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </button>
                      </li>
                      <li>
                        <LogoutButton/>
                      </li>
                    </ul>
            </div>
          </div>
        }
        { view === 'list' && <div style={{ width: 'fit-content', maxWidth:'75%', color: '#FFFFFF' }}> <MovieSlider type="visti" token={token} /> <MovieSlider type='vedere' token={token}/></div> } 
        {view === 'genres' && <div className='genre-content'>
          <GenreSlider/>
          <button className='add-genre'><FontAwesomeIcon icon={faPlus} /></button>
        </div>}
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
                      <li>
                        <div className='li-content'>
                          <a>Email: &nbsp;</a>
                          <input
                              type="text" 
                              name="email"
                              value={formData.email}
                              disabled={true} 
                              onChange={handleChange}
                          /> 
                        </div>
                      </li>
                    </ul>
                    <ul className='mini-button'>
                      <li>
                        <button to="#" onClick={() => handleUpdate()}>
                          {update ? 'Salva modifiche' : 'Modifica'}
                        </button>
                      </li>
                      <li>
                        <LogoutButton/>
                      </li>
                    </ul>
            </div>
          </div>
        }
        {
          view === 'list' && <div style={{ color: '#FFFFFF' }}>
            <MovieSlider type="visti" token={token} />
            <MovieSlider type="vedere" token={token}/>
          </div>
        }
        {view === 'genres' && <div className='genre-content'>
            <GenreSlider type="I miei generi"/>
            <button className='add-genre'><FontAwesomeIcon icon={faPlus} /></button>
          </div>} 
      </div>
    </div>
    </>
  );
}

export default ProfilePage;