import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import './VirtualGames.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AVIATOR_IMG from './assets/aviator.jpeg';
import PUSPARANI_IMG from './assets/pusparani.jpeg';

const VirtualGames = () => {
  
  let navigate = useNavigate();
  
  const handleAviatorClick = (e) => {
    console.log("aviator click");
    e.preventDefault();
    navigate("/aviator");
  };

  const handlePusparaniClick = (e) => {
    console.log("pusparani click");
    e.preventDefault();
    navigate("/pushparani");
  };
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const VirtualGames = [
    {
      // name: "AVIATOR",
      gradient: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      // game: "Play Now",
      bgImage: AVIATOR_IMG,
      onClick: handleAviatorClick
    },
    {
      // name: "PUSHPARANI",
      gradient: "linear-gradient(135deg, #16a085 0%, #1abc9c 100%)",
      // game: "Play Now",
      bgImage: PUSPARANI_IMG,
      onClick: handlePusparaniClick
    },
    {
      name: "Lightning Dice",
      gradient: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      game: "Coming Soon",
      bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSftYlIcjSKzS6VUv_OVpGeEwVY-B4mRgnPA&s"
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
    <div className="virtual-games-section">
      <div className="virtual-games-header">
        <div className="header-left">
          <FaGamepad className="game-icon" />
          <h2>Virtual Games</h2>
        </div>
      </div>
      <div className="virtual-games-grid">
        {VirtualGames.map((game, index) => (
          <div 
            key={index} 
            className="virtual-game-card" 
            style={{ 
              background: game.gradient, 
              backgroundImage: `url(${game.bgImage})`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="game-card-inner">
              <div className="game-overlay">
                <h3 onClick={game.onClick}>{game.name}</h3>
                <p onClick={game.onClick}>{game.game}</p>
                {game.onClick && (
                  <button className="Play-Button" onClick={game.onClick}>Play Now</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualGames;