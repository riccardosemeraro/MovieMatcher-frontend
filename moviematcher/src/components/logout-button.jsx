import React, { useState } from 'react';
import '../style/login-button.css';

const LogoutButton = () => {
    return (
      <button
        className="btn btn-danger btn-block"
        onClick={() => window.location = '/logout'}
      >
        Log Out
      </button>
    );
  };

export default LogoutButton;