import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LotteryCard.css';

const LotteryCard = ({ openLoginModal, route, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      navigate(route);
    }
  };

  return (
    <div className="lottery-section">
      <div className="lottery-card">
        <div className="lottery-content">
          <div className="lottery-title">LOTTERY</div>
          {/* <div className="lottery-text">ENTER AND WIN</div> */}
          <div className="lottery-prize2">JACKPOT PRIZE</div>
          <div className="lottery-amount">₹1,00,000</div>
          <button className="lottery-enter-button" onClick={handleClick}>
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LotteryCard;
