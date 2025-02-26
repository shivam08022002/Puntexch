import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCasino.css';
import axios from 'axios';
import TokenService from '../services/token-service';


const HomeCasino = () => {
  const casinoData = [
    {
      name: "Evolution Lobby",
      id: "8ef39602e589bf9f32fc351b1cbb338b",
      img: "https://i0.wp.com/www.singaporeplay.com/wp-content/uploads/Evolution-Gaming.jpg?resize=650%2C410&ssl=1",
    },
    {
      name:"Playtech Lobby",	
      id:"c38efc51028bd65f42396fa079c125d6",	
      img:"https://images.ctfassets.net/gfvfx5dc97y3/5MetwO8MX50adHJT4HWEXh/39da691cfbdb48a0f6d6f7d7c9f38c1c/white_king_ii.playtech.background.jpeg"
      },
    
      {
        name: "European Roulette",
        id: "6d3a70a2a87674728281f1de1567f515",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/km/Game_KMQM_European_Roulette_520x520.jpg"
      },
      {
        "name": "Blackjack",
        "id": "4605668e8b04418b3c6358b3eb9b1b80",
        img: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/km/Game_KMQM_Blackjack_520x520.jpg"
      },
  ];  
  const handleCasinoGamesClick = async (e, casinoId, providerName) => {
    e.preventDefault();
    try {
        const accessToken = TokenService.getLocalAccessToken();
        console.log('accessToken', accessToken);
        console.log(`Provider: ${providerName}, Game ID: ${casinoId}`);  // Debugging  

        if (!accessToken) {
            console.error("No access token found! User might be logged out.");
            return;
        }

        if (!casinoId) {
            console.error("No gameId provided! Check if the selected provider's games have valid IDs.");
            return;
        }

        const res = await axios.get(`https://nice247.pro/backend/gamma/getCasinoGameUrl?gameId=${casinoId}`, {
          headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (res.data && res.data.gameUrl) {
            console.log(`Game URL for ${providerName}:`, res.data.gameUrl);
            window.open(res.data.gameUrl, "_blank");
        } else {
            console.error(`Invalid response format for ${providerName}:`, res.data);
        }
    } catch (err) {
        console.error(`Error fetching game link for ${providerName}:`, err.response?.data || err.message);
    }
};
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
                  backgroundImage: `url(${casino.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="home-casino-overlay">
                  <h3>{casino.name}</h3>
                  <p>{casino.game}</p>
                  <button className="play-button" onClick={(e) => handleCasinoGamesClick(e, casino.id)}>Play Now</button>
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
