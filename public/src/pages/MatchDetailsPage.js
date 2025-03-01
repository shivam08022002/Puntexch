import React, { useState,useEffect } from 'react';
import { FaExchangeAlt, FaChartLine, FaLock, FaTv, FaCheck } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import './MatchDetailsPage.css';

// Session Market Component
const SessionMarket = () => (
  <div className="market-section">
    <div className="market-header">
      <div className="market-title">
        Session Market
        <FaCheck className="check-icon" />
      </div>
      <div className="market-actions">
        <button className="action-btn"><FaExchangeAlt /></button>
        <button className="action-btn"><FaChartLine /></button>
        <button className="action-btn"><FaLock /></button>
      </div>
    </div>
    <div className="odds-table">
      <div className="table-header">
        <div>Session</div>
        <div className="back-header">
          <div>Back</div>  
          <div>Back</div>
          </div>
        <div className="lay-header">
        <div>Lay</div>
        <div>Lay</div>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">20 Over ADKR</div>
        <div className="odds-box back">
          <span className="price">189</span>
          <span className="amount">100</span>
        </div>
        <div className="odds-box lay">
          <span className="price">190</span>
          <span className="amount">100</span>
        </div>
      </div>
      <div className="bet-limits">
        Min: 100 | Max: 100K
      </div>
    </div>
  </div>
);

// Ball By Ball Component
const BallByBallMarket = () => (
  <div className="market-section">
    <div className="market-header">
      <div className="market-title">Ball By Ball
      <FaCheck className="check-icon" />
      </div>
      
      <div className="market-actions">
        <button className="action-btn"><FaExchangeAlt /></button>
        <button className="action-btn"><FaChartLine /></button>
        <button className="action-btn"><FaLock /></button>
      </div>
    </div>
    <div className="odds-table">
      <div className="table-header">
        <div>Ball</div>
        <div className="back-header">
          <div>Back</div>  
          <div>Back</div>
          </div>
        <div className="lay-header">
        <div>Lay</div>
        <div>Lay</div>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">19.5 ball run ADKR</div>
        <div className="odds-box back">
          <span className="price">187</span>
          <span className="amount">250</span>
        </div>
        <div className="odds-box lay">
          <span className="price">187</span>
          <span className="amount">150</span>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">19.6 ball run ADKR</div>
        <div className="odds-box suspended">
          SUSPENDED
        </div>
      </div>
      <div className="bet-limits">
        Min: 100 | Max: 100K
      </div>
    </div>
  </div>
);

const MatchDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState('scoreboard');
  const [selectedMarket, setSelectedMarket] = useState('all');
  useParams();
  const location = useLocation();

  const marketTypes = [
    { id: 'all', label: 'All' },
    { id: 'Session', label: 'Session Market' },
    { id: 'fancy', label: 'Fancy Market' },
    { id: 'ball', label: 'Ball By Ball' },
    { id: 'fancy1', label: 'Fancy 1' },
    { id: 'meter', label: 'Meter Market' },
    { id: 'khado', label: 'Khado Market' },
  ];

  const matchData = location.state?.matchData || {
    time: "Loading...",
    status: "INPLAY",
    team1: "Team 1",
    team2: "Team 2",
    odds: [{
      back: [
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" }
      ],
      lay: [
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" }
      ]
    }],
    bookmaker: {
      team1: {
        back: { price: "0.00", amount: "0K" },
        lay: { price: "0.00", amount: "0K" }
      },
      team2: {
        back: { price: "0.00", amount: "0K" },
        lay: { price: "0.00", amount: "0K" }
      }
    }
  };

  const renderBookmakerSection = () => (
    <div className="market-section bookmaker-section">
      <div className="market-header">
        <div className="market-title">Bookmaker
        <span className="cash-out">CASH OUT</span>

        </div>
        <div className="market-actions">
          <button className="action-btn"><FaExchangeAlt /></button>
          <button className="action-btn"><FaChartLine /></button>
          <button className="action-btn"><FaLock /></button>
        </div>
      </div>
      <div className="odds-table">
        <div className="table-header">
          <div>Teams</div>
          <div className="back-header">
          <div>Back</div>
          <div>Back</div>

          </div>
          <div className="lay-header">
          <div>Lay</div>
          <div>Lay</div>

          </div>
        </div>
        <div className="team-row">
          <div className="team-name">Western Australia Women</div>
          <div className="odds-box suspended">
            SUSPENDED
          </div>
        </div>
        <div className="team-row">
          <div className="team-name">Victoria Women</div>
          <div className="odds-box back">
            <span className="price">40</span>
            <span className="amount">100K</span>
          </div>
          <div className="odds-box lay">
            <span className="price">45</span>
            <span className="amount">100K</span>
          </div>
        </div>
        <div className="bet-limits">
          Min: 100 | Max: 100K
        </div>
      </div>
    </div>
  );

  const renderMarketContent = () => {
    switch (selectedMarket) {
      case 'all':
        return (
          <div className="all-markets">
            <SessionMarket />
            <BallByBallMarket />
          </div>
        );
      case 'Session':
        return <SessionMarket />;
      case 'ball':
        return <BallByBallMarket />;
      default:
        return null;
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  return (
    <div className="match-details-container">
      <div className="mobile-tabs">
        <button 
          className={`mobile-tab ${selectedTab === 'scoreboard' ? 'active' : ''}`}
          onClick={() => setSelectedTab('scoreboard')}
        >
          Scoreboard
        </button>
        <button 
          className={`mobile-tab ${selectedTab === 'tv' ? 'active' : ''}`}
          onClick={() => setSelectedTab('tv')}
        >
          Live TV
        </button>
      </div>

      <div className="match-details-content">
        <div className={`match-details-main ${selectedTab === 'scoreboard' ? 'active' : ''}`}>
          <div>
            
          <div className="graph-section">
                <div className="graph-team">Graph section</div>
                <div className="graph-line">
                  <div className="graph-dot" style={{ left: '60%' }}></div>
                </div>
                <div className="graph-team"></div>
              </div>
            
            <div className="match-header">
              <div className="match-time">
                <span>{matchData.time}</span>
                <span className="status">{matchData.status}</span>
              </div>
              <div className="match-teams">
                <h1>{matchData.team1} <span> </span> {matchData.team2}</h1>
              </div>
            </div>
            
            <div className="market-sections">
              <div className="market-section">
                <div className="market-header">
                  <div className="market-title">
                    Match Odds
                    <span className="cash-out">CASH OUT</span>
                  </div>
                  <div className="market-actions">
                    <button className="action-btn"><FaExchangeAlt /></button>
                    <button className="action-btn"><FaChartLine /></button>
                    <button className="action-btn"><FaLock /></button>
                  </div>
                </div>

                <div className="odds-table-container">
                  <div className="odds-table">
                    <div className="table-header">
                      <div>Teams</div>
                      <div className="back-header">
                        <div>Back</div>
                        <div>Back</div>
                      </div>
                      <div className="lay-header">
                        <div>Lay</div>
                        <div>Lay</div>
                      </div>
                      
                    </div>

                    <div className="team-row">
                      <div className="team-name">{matchData.team1}</div>
                      <div className="odds-group">
                        {matchData.odds[0]?.back.slice(0, 2).map((odd, index) => (
                          <div key={`back-${index}`} className="odds-box back">
                            <span className="price">{odd.price}</span>
                            <span className="amount">{odd.amount}</span>
                          </div>
                        ))}
                      </div>
                      <div className="odds-group">
                        {matchData.odds[0]?.lay.slice(0, 2).map((odd, index) => (
                          <div key={`lay-${index}`} className="odds-box lay">
                            <span className="price">{odd.price}</span>
                            <span className="amount">{odd.amount}</span>
                          </div>
                          
                        ))}
                      </div>
                      
                    </div>
                         <div className="bet-limits">
                          Min: 100 | Max: 100K
                     </div>
                  </div>
                </div>
              </div>
              {renderBookmakerSection()}
            </div>
          </div>
        </div>

        <div className="tv-screen-tab">
          <div className={`live-tv-section ${selectedTab === 'tv' ? 'active' : ''}`}>
             
              <div className="tv-container">
                <div className="live-tv-header">
                  <FaTv className="tv-icon" />
                  <span>Live TV</span>
                </div>
                <div className="live-tv-content">
                  <div className="tv-placeholder">
                    <FaTv className="large-tv-icon" />
                    <p>Live streaming is available for this match</p>
                    <button className="watch-live-btn">Watch Live</button>
                  </div>
                </div>
              </div>
            
            
            <div>
              <div className="match-header">
                <div className="match-time">
                  <span>{matchData.time}</span>
                  <span className="status">{matchData.status}</span>
                </div>
                <div className="match-teams">
                  <h1>{matchData.team1} <span> </span> {matchData.team2}</h1>
                </div>
              </div>

              <div className="market-sections">
                <div className="market-section">
                  <div className="market-header">
                    <div className="market-title">
                      Match Odds
                      <span className="cash-out">CASH OUT</span>
                    </div>
                    <div className="market-actions">
                      <button className="action-btn"><FaExchangeAlt /></button>
                      <button className="action-btn"><FaChartLine /></button>
                      <button className="action-btn"><FaLock /></button>
                    </div>
                  </div>

                  <div className="odds-table-container">
                    <div className="odds-table">
                      <div className="table-header">
                        <div>Teams</div>
                        <div className="back-header">
                          <div>Back</div>
                          <div>Back</div>
                        </div>
                        <div className="lay-header">
                          <div>Lay</div>
                          <div>Lay</div>
                        </div>
                      </div>

                      <div className="team-row">
                        <div className="team-name">{matchData.team1}</div>
                        <div className="odds-group">
                          {matchData.odds[0]?.back.slice(0, 2).map((odd, index) => (
                            <div key={`back-${index}`} className="odds-box back">
                              <span className="price">{odd.price}</span>
                              <span className="amount">{odd.amount}</span>
                            </div>
                          ))}
                        </div>
                        <div className="odds-group">
                          {matchData.odds[0]?.lay.slice(0, 2).map((odd, index) => (
                            <div key={`lay-${index}`} className="odds-box lay">
                              <span className="price">{odd.price}</span>
                              <span className="amount">{odd.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderBookmakerSection()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="markets-container">
        <div className="market-types-nav">
          {marketTypes.map(market => (
            <button
              key={market.id}
              className={`market-type-btn ${selectedMarket === market.id ? 'active' : ''}`}
              onClick={() => setSelectedMarket(market.id)}
            >
              {market.label}
            </button>
          ))}
        </div>

        <div className="market-content">
          {renderMarketContent()}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;