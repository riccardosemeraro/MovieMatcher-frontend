import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProfileCard from '../components/profileCard';
import ActionButtons from '../components/actionButton';
import '../style/explorePage.css';

function ExplorePage() {
  return (
    <div className="explore-page">
      <Header />
      <main>
        <h1>Esplora</h1>
        <div className="explore-content">
          <ProfileCard />
          <ActionButtons />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ExplorePage;