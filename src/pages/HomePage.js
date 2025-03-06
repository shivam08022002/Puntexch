import { React,useEffect } from 'react';
import HomeCasino from '../components/HomeCasino';
import VirtualGames from '../components/VirtualGames';
import './HomePage.css';

const HomePage = ({ openLoginModal }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-page">
      <div className="home-content">
        <VirtualGames openLoginModal={openLoginModal} />
        <HomeCasino openLoginModal={openLoginModal} />
      </div>
    </div>
  );
};

export default HomePage;