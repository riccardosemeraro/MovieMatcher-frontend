import React from 'react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

// Componente per gestire la visualizzazione dei pulsanti di autenticazione
const AuthenticationButton = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </>
  );
};

export default AuthenticationButton;
