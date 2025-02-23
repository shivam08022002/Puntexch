import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCasino.css';

const HomeCasino = () => {
  const casinoData = [
    {
      name: "Live Roulette",
      gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      game: "Evolution Gaming",
      bgImage: "https://img.freepik.com/premium-photo/online-casino-3d-realistic-roulette-wheel-slot-machine-blue-background_1029469-220462.jpg?w=360",
    },
    {
      name: "Teen Patti",
      gradient: "linear-gradient(135deg, #009688 0%, #4CAF50 100%)",
      game: "Live Teen Patti",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVVwy44J5zmc8aup1eccaCBv_eXcQknr3hA&s",
    },
    {
      name: "Blackjack",
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      game: "Live Blackjack",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPIAwyX9v1ymBh-pF4izSZFQOgHq9UDoe-tg&s",
    },
    {
      name: "Poker",
      gradient: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
      game: "Texas Hold'em",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPyZcVoZC5H9DfX9ojH0aJUZscpOQ1eMgBQA&s",
    },
  ];

  return (
    <div className="home-casino-section">
      <div className="home-casino-header">
        <div className="header-left">
          <h2>🎰 Live Casino</h2>
        </div>
        <Link to="/casino" className="view-all-button">View All</Link>
      </div>
      <div className="home-casino-grid">
        {casinoData.map((casino, index) => (
          <div key={index} className="home-casino-card">
            <div className="home-casino-card-inner">
              <div
                className="home-casino-card-front"
                style={{
                  background: casino.gradient,
                  backgroundImage: `url(${casino.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="home-casino-overlay">
                  <h3>{casino.name}</h3>
                  <p>{casino.game}</p>
                  <button className="play-button">Play Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCasino;
