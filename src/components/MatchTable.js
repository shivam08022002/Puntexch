import React from 'react';
import './MatchTable.css';
import { useNavigate } from 'react-router-dom';

const MatchTable = ({ sport, matches }) => {
  const navigate = useNavigate();

  const handleMatchClick = (id) => {
    navigate(`/match/${id}`);
  };

  return (
    <div className="sport-section">
      <div className="sport-header">
        <div className="sport-info">
          <h2>{sport.displayName}</h2>
          {/* <span className="match-count">{sport.count}</span> */}
        </div>
      </div>
      <div className="matches-container">
        {matches.map((match, index) => (
          <div
            key={index}
            className="match-row"
            onClick={() => handleMatchClick(match.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="match-info">
              {/* <div className="tournament">{match.tournament}</div> */}
              <div className="team-names">{match.name}</div>
              <div className="time-odd">
                <div className="match-time">
                  <span className="date">{match.openDate}</span>
                  {/* <span className="time">{match.time}</span> */}
                </div>
                {/* <div className="odds-container">
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
                </div> */}
              </div>
              {/* <div className="bet-limits">
                <span>Min: {match.minBet}</span>
                <span>Max: {match.maxBet}</span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTable;
