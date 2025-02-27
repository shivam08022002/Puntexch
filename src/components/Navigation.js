import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaClock,
  FaBaseballBall,
  FaFutbol,
  FaTableTennis,
  FaBasketballBall,
  FaDice,
  FaHorse,
  FaVolleyballBall,
  FaHockeyPuck,
  FaFistRaised,
  FaGolfBall,
  FaFootballBall,
  FaGamepad,
} from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {

  const sports = [
    { name: 'Inplay', icon: <FaClock /> },
    { name: 'Cricket', icon: <FaBaseballBall/> },
    { name: 'Soccer', icon: <FaFutbol /> },
    { name: 'Tennis', icon: <FaTableTennis /> },
    { name: 'Basketball', icon: <FaBasketballBall /> },
    { name: 'Volleyball', icon: <FaVolleyballBall /> },
    { name: 'Casino', icon: <FaDice /> },
    { name: 'Horse Racing', icon: <FaHorse /> },
    { name: 'Ice Hockey', icon: <FaHockeyPuck /> },
    { name: 'Boxing', icon: <FaFistRaised /> },
    { name: 'Golf', icon: <FaGolfBall /> },
    { name: 'NFL', icon: <FaFootballBall /> },
    { name: 'Esports', icon: <FaGamepad /> },
  ];

  const handleSportClick = (sport) => {
  };

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-links">
          {sports.map((sport) => (
            <NavLink
              key={sport.name}
              to={sport.name.toLowerCase() === 'inplay' 
                ? '/inplay' 
                : sport.name.toLowerCase() === 'casino'
                ? '/casino'
                : `/sports/${sport.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => handleSportClick(sport.name.toLowerCase())}
            >
              <span className="nav-icon">{sport.icon}</span>
              <span className="nav-text">{sport.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
