import React from 'react';
import '../style/actionButton.css';

function ActionButtons() {
  return (
    <div className="action-buttons">
      <button className="nope-button">✗</button>
      <button className="like-button">♥</button>
      <button className="superlike-button">⭐</button>
    </div>
  );
}

export default ActionButtons;