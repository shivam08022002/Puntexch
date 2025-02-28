import React from 'react';
import './MatchTable.css';
import { useNavigate } from 'react-router-dom';

const MatchTable = ({ sport, matches }) => {
  const navigate = useNavigate();

  const handleMatchClick = (match, index) => {
    navigate(`/match/${match.id || index}`, {
      state: {
        matchData: {
          time: match.time,
          date: match.date,
          status: "INPLAY",
          team1: match.teams.split(' vs ')[0],
          team2: match.teams.split(' vs ')[1],
          odds: [{
            back: [
              { price: match.odds.back1, amount: "100K" },
              { price: match.odds.back2, amount: "200K" },
              { price: match.odds.back3, amount: "300K" }
            ],
            lay: [
              { price: match.odds.lay1, amount: "100K" },
              { price: match.odds.lay2, amount: "200K" },
              { price: match.odds.lay3, amount: "300K" }
            ]
          }],
          bookmaker: {
            team1: {
              back: { price: match.odds.back1, amount: "100K" },
              lay: { price: match.odds.lay1, amount: "100K" }
            },
            team2: {
              back: { price: match.odds.back2, amount: "100K" },
              lay: { price: match.odds.lay2, amount: "100K" }
            }
          }
        }
      }
    });
  };

  return (
    <div className="sport-section">
      <div className="sport-header">
        <div className="sport-info">
          <h2>{sport.displayName}</h2>
          <span className="match-count">{sport.count}</span>
        </div>
      </div>
      <div className="matches-container">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className="match-row"
            onClick={() => handleMatchClick(match, index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="match-info">
              <div className="tournament">{match.tournament}</div>
              <div className="team-names">{match.teams}</div>
              <div className="time-odd">
                <div className="match-time">
                  <span className="date">{match.date}</span>
                  <span className="time">{match.time}</span>
                </div>
                <div className="odds-container">
                  <div className="back">
                    <div className="odds-value">{match.odds.back1}</div>
                    <div className="odds-value">{match.odds.back2}</div>
                    <div className="odds-value">{match.odds.back3}</div>
                  </div>
                  <div className="lay">
                    <div className="odds-value">{match.odds.lay1}</div>
                    <div className="odds-value">{match.odds.lay2}</div>
                    <div className="odds-value">{match.odds.lay3}</div>
                  </div>
                </div>
              </div>
              <div className="bet-limits">
                <span>Min: {match.minBet}</span>
                <span>Max: {match.maxBet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTable;
