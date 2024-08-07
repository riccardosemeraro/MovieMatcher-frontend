import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from "./profileCard";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        {/* https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure#user-profile-attributes */}
        <ProfileCard />
      </div>
    )
  );
};

export default Profile;