import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    isAuthenticated && (
      <div>
        {/* https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure#user-profile-attributes */}
        {/* Object
                email: "riccardosemer@gmail.com"
                email_verified: true
                family_name: "Semeraro"
                given_name: "Riccardo"
                name: "Riccardo Semeraro"
                nickname: "riccardosemer"
                picture: "https://lh3.googleusercontent.com/a/ACg8ocILwelJWLjwDH0AZ6iOtLYhEV_v5MQHCg17_uobKwWRmPIopIAY=s96-c"
                sub: "google-oauth2|118391339072684839982"
                updated_at: "2024-08-02T21:36:59.848Z"
        */}
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;