import { useState, useEffect } from 'react'
import UnityGame from './UnityGame'
import './PushpaRani.css'
import PropTypes from "prop-types"
import { FaHistory } from "react-icons/fa";

const Navbar = () => (
  <div className="pushpa-navbar-aviator">
    <div className="pushpa-site-logo">Aviator</div>
    <div className="pushpa-right-section">
      <div className="pushpa-coin-section">
        <div className="pushpa-coin-icon"></div>
        <span className="pushpa-amount">0 ₹</span>
      </div>
      <div className="pushpa-hamburger">☰</div>
    </div>
  </div>
);

const Multipliers = () => (
  <div className="pushpa-multiplier-container" style={{display:"flex",flexDirection:"row"}}>
    <div className="pushpa-multiplier-scroll">
      <div className="pushpa-multiplier" style={{ color: '#fff' }}>1.03x</div>
      <div className="pushpa-multiplier" style={{ color: '#0f0' }}>1.19x</div>
      <div className="pushpa-multiplier" style={{ color: '#ff0' }}>1.77x</div>
      <div className="pushpa-multiplier" style={{ color: '#f00' }}>1.24x</div>
      <div className="pushpa-multiplier" style={{ color: '#f0f' }}>9.80x</div>
      <div className='histry-container'>
              <button className="histry-button">
            <FaHistory className="histry-icon" />
            <span className="dropdown-arr">▼</span>
            </button>
            </div>
    </div>
    {/* <div className="pushpa-dropdown-history">
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        // fill="none" 
        stroke="#666666" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M1 4v6h6"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
    </div> */}
  </div>
);

const GameWindow = () => (
  <div className="pushpa-game-window">
    <Multipliers />
    <UnityGame />
  </div>
);

const BettingSection = ({ title }) => {
  const [amount, setAmount] = useState(10);
  const [activeTab, setActiveTab] = useState('bet');
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [autoMultiplier, setAutoMultiplier] = useState(1.1);
  const [isBetting, setIsBetting] = useState(false);
  const presetAmounts = [10, 100, 500, 1000];


const adjustAmount = (increment) => {
  if (!isBetting) {
    setAmount(prev => Math.max(0, prev + increment));
  }
};  // Close adjustAmount function

const handleBetClick = () => {  // Separate function at the same level
  setIsBetting(!isBetting);
};

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className={`pushpa-betting-section ${isBetting ? 'betting-active' : ''}`}>
      <div className="pushpa-betting-tabs">
        <div className="pushpa-tabs-container">
          <button
            className={`tab ${activeTab === 'bet' ? 'active' : ''}`}
            onClick={() => setActiveTab('bet')}
          >
            {title}
          </button>
          <button
            className={`tab ${activeTab === 'auto' ? 'active' : ''}`}
            onClick={() => setActiveTab('auto')}
          >
            Auto
          </button>
        </div>
      </div>

      <div className="pushpa-betting-controls">

        <div className="pushpa-main-controls">
        

          <div className="pushpa-amount-control">
            <div className="pushpa-amount-adjuster">
              <button
                onClick={() => adjustAmount(-10)}
                className="pushpa-adjuster-btn"
                disabled={isBetting}
              >−</button>
              <input
                type="number"
                value={amount}
                onChange={(e) => !isBetting && setAmount(Number(e.target.value))}
                className="pushpa-amount-input"
                disabled={isBetting}
              />
              <button
                onClick={() => adjustAmount(10)}
                className="pushpa-adjuster-btn"
                disabled={isBetting}
              >+</button>
            </div>

            <div className="pushpa-preset-amounts">
              <div className="pushpa-preset-row">
                <button
                  onClick={() => !isBetting && setAmount(10)}
                  className="pushpa-preset-btn"
                  disabled={isBetting}
                >10</button>
                <button
                  onClick={() => !isBetting && setAmount(100)}
                  className="pushpa-preset-btn"
                  disabled={isBetting}
                >100</button>
              </div>
              <div className="pushpa-preset-row">
                <button
                  onClick={() => !isBetting && setAmount(500)}
                  className="pushpa-preset-btn"
                  disabled={isBetting}
                >500</button>
                <button
                  onClick={() => !isBetting && setAmount(1000)}
                  className="pushpa-preset-btn"
                  disabled={isBetting}
                >1000</button>
              </div>
            </div>
          </div>
          
          <button
            className={`pushpa-bet-button ${isBetting ? 'pushpa-cancel' : ''}`}
            onClick={handleBetClick}
          >
            
            <div className="pushpa-bet-insider" style={{display:"flex",flexDirection:"column"}}>   
            {isBetting && (
            <div className="pushpa-waiting-text">Waiting for next round</div>
          )}   
            <div className="pushpa-bet-text">{isBetting ? 'CANCEL' : 'BET'}
              
            </div>
           
            {!isBetting && <div className="pushpa-bet-amount">{amount}₹</div>}
          </div>
          </button>
        </div>

        {activeTab === 'auto' && (
          <div className="pushpa-auto-controls">
            {/* <div className="pushpa-divider"></div> */}
            <div className="pushpa-auto-bottom-controls">
              <button className="pushpa-auto-play-btn">AUTO PLAY</button>
              <div className="pushpa-auto-cashout-control">
                <div className="pushpa-toggle-container">
                  <span>Auto Cash Out</span>
                  <label className="pushpa-toggle">
                    <input
                      type="checkbox"
                      checked={autoCashOut}
                      onChange={(e) => setAutoCashOut(e.target.checked)}
                    />
                    <span className="pushpa-toggle-slider"></span>
                  </label>
                </div>
                <div className="pushpa-multiplier-input-container">
                  <input
                    type="number"
                    value={autoMultiplier}
                    onChange={(e) => setAutoMultiplier(Number(e.target.value))}
                    disabled={!autoCashOut}
                    className="pushpa-multiplier-input"
                    step="0.1"
                    min="1.1"
                  />
                  <span
                    className="pushpa-multiply-symbol"
                    onClick={() => autoCashOut && setAutoMultiplier(1.1)}
                  >
                    ×
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

  // Add this style tag right before your return statement


const BettingHistory = () => {
  const [activeTab, setActiveTab] = useState('allBets');
  const [totalBets, setTotalBets] = useState(205160.8);
  const [currentBets, setCurrentBets] = useState([]);

  // Generate a single bet
  const generateBet = (id) => ({
    id,
    user: `user${Math.floor(Math.random() * 999)}`,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`,
    bet: (7000 + Math.random() * 1500).toFixed(2),
    multiplier: (1 + Math.random() * 2).toFixed(2),
    cashout: null
  });

  // Static data for my bets
  const [myBets, setMyBets] = useState(() => {
    const date = new Date();
    return Array(20).fill(null).map((_, index) => ({
      id: index,
      date: new Date(date - index * 5 * 60000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      bet: (5000 + Math.random() * 3000).toFixed(2),
      multiplier: (1 + Math.random()).toFixed(2),
      cashout: (5000 + Math.random() * 3000 * (1 + Math.random())).toFixed(2)
    }));
  });

  // Initialize and update all bets
  useEffect(() => {
    const initial = Array(10).fill(null).map((_, i) => generateBet(i));
    setCurrentBets(initial);

    const interval = setInterval(() => {
      const newBet = generateBet(Date.now());
      newBet.cashout = (parseFloat(newBet.bet) * parseFloat(newBet.multiplier)).toFixed(2);
      setTotalBets(prev => prev + parseFloat(newBet.bet));
      setCurrentBets(prev => [...prev.slice(1), newBet]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pushpa-betting-history">
      <div className="pushpa-history-tabs">
        <div className="pushpa-tabs-container2">
          <button
            className={`tab ${activeTab === 'allBets' ? 'active' : ''}`}
            onClick={() => setActiveTab('allBets')}
          >
            All Bets
          </button>
          <button
            className={`tab ${activeTab === 'myBets' ? 'active' : ''}`}
            onClick={() => setActiveTab('myBets')}
          >
            My Bets
          </button>
        </div>
      </div>

      <div className="pushpa-bets-container">
        {activeTab === 'allBets' ? (
          // All Bets View
          <>
            <div className="pushpa-bets-header">
              <div className="pushpa-total-bets-section">
                <div className="pushpa-total-bets-header">
                  <span>ALL BETS</span>
                </div>
                <div className="pushpa-total-amount">{totalBets.toFixed(2)}</div>
                <div className="pushpa-divider"></div>
              </div>
              <div className="pushpa-bets-columns">
                <span>User</span>
                <span>Bet, ₹</span>
                <span>X</span>
                <span>Cash out, ₹</span>
              </div>
            </div>
            <div className="pushpa-bets-list">
              {currentBets.map((bet) => (
                <div key={bet.id} className={`pushpa-bet-row ${bet.cashout ? 'won' : ''}`}>
                  <div className="pushpa-user-info">
                    <img src={bet.avatar} alt="avatar" className="pushpa-avatar" />
                    <span>{bet.user}</span>
                  </div>
                  <span className="pushpa-bet-amount2">{bet.bet}</span>
                  <span className="pushpa-multiplier">{bet.multiplier}x</span>
                  <span className="pushpa-cashout">{bet.cashout}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          // My Bets View
          <>
            <div className="pushpa-bets-header">
              <div className="pushpa-bets-columns my-bets-columns">
                <span>Date</span>
                <span>Bet, ₹</span>
                <span>X</span>
                <span>Cash out, ₹</span>
              </div>
            </div>
            <div className="pushpa-bets-list my-bets-list">
              {myBets.map((bet) => (
                <div key={bet.id} className="pushpa-bet-row-won">
                  <span className="pushpa-date">{bet.date}</span>
                  <span className="pushpa-bet-amount2">{bet.bet}</span>
                  <span className="pushpa-multiplier">{bet.multiplier}x</span>
                  <span className="pushpa-cashout">{bet.cashout}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PushpaRani = () => {
  return (
    <div className="pushpa-desktop-wrapper">
      <div className="pushpa-app-container">
        <div className="pushpa-game-container">
          <GameWindow />
        </div>
        <div className="pushpa-betting-sections">
          <BettingSection title="Bet" />
          <BettingSection title="Bet" />
          <BettingHistory />
        </div>
       
      </div>
    </div>
  )
}

BettingSection.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PushpaRani