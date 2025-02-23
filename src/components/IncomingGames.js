import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import './IncomingGames.css';

const IncomingGames = () => {
  const incomingGames = [
    {
      name: "Speed Baccarat",
      gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
      game: "Coming Soon",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPs2ihwwrBHcKwuY7EQdowvVoB0NgnFmuzqw&s"
    },
    {
      name: "Lightning Dice",
      gradient: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      game: "Coming Soon",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSftYlIcjSKzS6VUv_OVpGeEwVY-B4mRgnPA&s"
    },
    {
      name: "Mega Ball",
      gradient: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
      game: "Coming Soon",
      bgImage: "https://bc.imgix.net/game/image/1d6f6b6510.png?_v=4&auto=format&dpr=2.625&w=100"
    },
    {
      name: "Poker",
      gradient: "linear-gradient(135deg, #16a085 0%, #1abc9c 100%)",
      game: "Coming Soon",
      bgImage: "https://cdn.vectorstock.com/i/1000v/50/13/poker-gambling-chips-poster-vector-965013.jpg"
    },
    {
      name: "Slots",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
      game: "Coming Soon",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbca7vAXxQC9zzB0w-ciyevMj2pxacjOy43w&s"
    },
    {
      name: "Bingo",
      gradient: "linear-gradient(135deg, #2980b9 0%, #8e44ad 100%)",
      game: "Coming Soon",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8h46DhvXMmAYvh0LQCHdQ5PRrReWiO8OPgIRMN4wVY4Cn3VdEdOliEXzDG4qQdSAV8Q&usqp=CAU"
    }
  ];

  return (
    <div className="incoming-games-section">
      <div className="incoming-games-header">
        <div className="header-left">
          <FaGamepad className="game-icon" />
          <h2>Upcoming Games</h2>
        </div>
      </div>
      <div className="incoming-games-grid">
        {incomingGames.map((game, index) => (
          <div 
            key={index} 
            className="incoming-game-card" 
            style={{ 
              background: game.gradient, 
              backgroundImage: `url(${game.bgImage})`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="game-card-inner">
              <div className="game-overlay">
                <h3>{game.name}</h3>
                <p>{game.game}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomingGames;
