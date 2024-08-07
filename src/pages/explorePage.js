import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProfileCard from '../components/profileCard';
import ActionButtons from '../components/actionButton';
import '../style/explorePage.css';

function ExplorePage() {
  return (
    <div className="explore-page">
      <main>
        <h1>Game Room</h1>
        <div className="explore-content">
          <ProfileCard />
          <ActionButtons />
        </div>
      </main>
    </div>
  );
}

export default ExplorePage;