import React from 'react';
import '../style/profileCard.css';

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-info">
        <h2>Nome Utente</h2>
        <p>Info Utente</p>
        <p>Lista Film visti</p>
        <p>Lista Film da veder</p>
        <p>Cronologia Partite</p>
        <p>^questa sezione va spostata nel profilo poi^</p>
      </div>
    </div>
  );
}

export default ProfileCard;