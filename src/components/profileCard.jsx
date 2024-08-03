import React from 'react';
import '../style/profileCard.css';

function ProfileCard() {
  return (
    <div className="profile-card">
      <img src="https://example.com/placeholder-image.jpg" alt="Profilo" />
      <div className="profile-info">
        <h2>Nome, Età</h2>
        <p>Breve bio o descrizione</p>
      </div>
    </div>
  );
}

export default ProfileCard;