import React from 'react';
// import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import HomeCasino from '../components/HomeCasino';
import IncomingGames from '../components/IncomingGames';
import LiveMatches from '../components/LiveMatches';
import MarqueeText from '../components/MarqueeText';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <MarqueeText />
      <Banner />
      <div className="home-content">
        <LiveMatches />
        <HomeCasino />
        <IncomingGames />
      </div>
    </div>
  );
};

export default HomePage; 