import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../style/profilePage.css';

function ProfilePage() {
  return (
    <div className="profile-page">
      <Header />
      <main>
        <h1>Il tuo profilo</h1>
        <div className="profile-content">
          <img src="https://example.com/profile-picture.jpg" alt="Foto profilo" className="profile-picture" />
          <div className="profile-details">
            <h2>Nome Cognome, 30</h2>
            <p>Breve bio: Appassionato di viaggi e buon cibo. Sempre in cerca di nuove avventure!</p>
            <button className="edit-profile-btn">Modifica profilo</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;