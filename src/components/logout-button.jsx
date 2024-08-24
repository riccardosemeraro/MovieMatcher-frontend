import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button style={{ background: 'transparent', border: 'none', fontSize: '16px', fontWeight:'bold', color: '#FFFFFF'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } }) && localStorage.removeItem('user') }>
      Log Out
    </button>
  );
};

export default LogoutButton;
