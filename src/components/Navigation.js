import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { httpHelpers } from "../services/httpHelpers";
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

const Navigation = ({ logout }) => {
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [matches, setMatches] = useState([]);
  const api = httpHelpers();
  const getLiveGames = "/gamma/getAllMatches?sportType=";

  const sports = [
    { name: 'Inplay', icon: <FaClock /> },
    { name: 'Cricket', icon: <FaBaseballBall/> },
    { name: 'Soccer', icon: <FaFutbol /> },
    { name: 'Tennis', icon: <FaTableTennis /> },
    { name: 'Basketball', icon: <FaBasketballBall /> },
    { name: 'Volleyball', icon: <FaVolleyballBall /> },
    { name: 'Horse Racing', icon: <FaHorse /> },
    { name: 'Ice Hockey', icon: <FaHockeyPuck /> },
    { name: 'Boxing', icon: <FaFistRaised /> },
    { name: 'Golf', icon: <FaGolfBall /> },
    { name: 'NFL', icon: <FaFootballBall /> },
    { name: 'Esports', icon: <FaGamepad /> },
    { name: 'Casino', icon: <FaDice /> },
  ];

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get(`${getLiveGames}${selectedSport}&matchStatus=LIVE`);
        setMatches(response?.data?.length > 0 ? response.data : []);
      } catch (err) {
        console.error("Error fetching live matches:", err);
        if (err?.response?.status === 401 && logout) logout();
        setMatches([]);
      }
    };
    fetchMatches();
  }, [selectedSport, api, logout]);

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
