import { React,useEffect } from 'react';
import HomeCasino from '../components/HomeCasino';
import VirtualGames from '../components/VirtualGames';
import LotteryCard from '../components/LotteryCard';
import './HomePage.css';

const HomePage = ({ openLoginModal, isLoggedIn }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-page">
      <div className="home-content">
        <LotteryCard 
          openLoginModal={openLoginModal} 
          route="/lottery"
          isLoggedIn={isLoggedIn}
        />
        <VirtualGames openLoginModal={openLoginModal} />
        <HomeCasino openLoginModal={openLoginModal} />
      </div>
    </div>
  );
};

export default HomePage;