import React, { useState, useEffect } from 'react';  // Add useEffect
import { NavLink, useNavigate } from 'react-router-dom';  // Add useNavigate
import {
  FaClock,
  FaBaseballBall,
  FaFutbol,
  FaTableTennis,
  FaBasketballBall,
  // FaDice,
  FaHorse,
  FaVolleyballBall,
  FaHockeyPuck,
  FaFistRaised,
  FaGolfBall,
  FaFootballBall,
  FaGamepad,
} from 'react-icons/fa';
import './Navigation.css';
import SportPage from '../pages/SportPage';
import Banner from './Banner';

const Navigation = ({ isLoggedIn, logOut }) => {
  const [selectedSport, setSelectedSport] = useState('inplay'); // Set default to 'inplay'

  // Add useEffect to ensure inplay is selected on component mount
  useEffect(() => {
    setSelectedSport('inplay');
  }, []);

  const sports = [
    { name: 'Inplay',  icon: <FaClock /> },
    { name: 'Cricket', icon: <FaBaseballBall /> },
    { name: 'Football', icon: <FaFutbol /> },
    { name: 'Tennis', icon: <FaTableTennis /> },
    { name: 'Basketball', icon: <FaBasketballBall /> },
    { name: 'Volleyball', icon: <FaVolleyballBall /> },
    // { name: 'Casino', icon: <FaDice /> },
    { name: 'Horse Racing', icon: <FaHorse /> },
    { name: 'Ice Hockey', icon: <FaHockeyPuck /> },
    { name: 'Boxing', icon: <FaFistRaised /> },
    { name: 'Golf', icon: <FaGolfBall /> },
    { name: 'NFL', icon: <FaFootballBall /> },
    { name: 'Esports', icon: <FaGamepad /> },
  ];

  const handleSportClick = (e, sport) => {
    e.preventDefault();
    setSelectedSport(sport);
  };

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-links">
          {sports.map((sport) => (
            <NavLink
              key={sport.name}
              className={({ isActive }) => 
                (isActive && selectedSport === sport.name.toLowerCase()) 
                  ? 'nav-link active' 
                  : 'nav-link'
              }
              onClick={(e) => handleSportClick(e, sport.name.toLowerCase())}
            >
              <span className="nav-icon">{sport.icon}</span>
              <span className="nav-text">{sport.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {selectedSport === 'inplay' && <Banner />}
      {selectedSport && <SportPage isLoggedIn={isLoggedIn} logOut={logOut} selectedSport={selectedSport} />}
    </nav>
  );
};

export default Navigation;
