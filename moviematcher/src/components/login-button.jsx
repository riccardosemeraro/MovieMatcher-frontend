import React, { useState } from 'react';
import '../style/login-button.css';

const LoginButton = () => {
    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => window.location = '/login'}
      >
        Log In
      </button>
    );
  };
  
export default LoginButton;
