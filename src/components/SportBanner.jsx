// components/Banner.js
import React from 'react';
import './SportBanner.css';
import { useEffect } from 'react';
const SportBanner = ({ sport, imageUrl }) => {
  
  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="sport-banner"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="banner-content">
        <h1>Virtual {sport}</h1>
        <p>Experience the thrill of virtual {sport.toLowerCase()} matches</p>
      </div>
      <button className="play-now-btn">Play Now</button>
    </div>
  );
};

export default SportBanner;
