import React from 'react';
import ActionButtons from '../components/actionButton';
import '../style/explorePage.css'; //rivedere nomi file css

function GameRoomPage() {
  return (
    <div className="explore-page">
      <main>
        <h1>Game Room</h1>
        <div className="explore-content">
          <ActionButtons />
        </div>
      </main>
    </div>
  );
}

export default GameRoomPage;