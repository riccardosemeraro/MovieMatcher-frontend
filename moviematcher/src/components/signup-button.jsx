import React, { useState } from 'react';
import '../style/login-button.css';


const SignupButton = () => {
    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => window.location = '/sign-up'}
      >
        Sign Up
      </button>
    );
  };
  
export default SignupButton;