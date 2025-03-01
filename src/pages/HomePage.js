import React from 'react';
// import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import HomeCasino from '../components/HomeCasino';
import VirtualGames from '../components/VirtualGames';
// import LiveMatches from '../components/LiveMatches';
import MarqueeText from '../components/MarqueeText';
import Navigation from '../components/Navigation';
import './HomePage.css';

const HomePage = ({ openLoginModal }) => {
  return (
    <div className="home-page">
      {/* <MarqueeText /> */}

      <div className="home-content">
        {/* <Navigation /> */}
        {/* <Banner /> */}
        <VirtualGames openLoginModal={openLoginModal} />
        <HomeCasino openLoginModal={openLoginModal} />
      </div>
    </div>
  );
};

export default HomePage;