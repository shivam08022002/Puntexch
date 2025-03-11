import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LotteryPage.css';

const LotteryPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const rulesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleBuyNow = () => {
    // Here you can add direct purchase logic
    console.log('Buy ticket clicked');
  };

  const handleTodayResult = () => {
    // Handle viewing today's result
    console.log('Today result clicked');
  };

  const handlePreviousResults = () => {
    // Handle viewing previous results
    console.log('Previous results clicked');
  };

  const scrollToRules = () => {
    rulesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const ticketData = [
    { id: '1', ticket: 'AB123XY45', status: 'Pending', result: '-' },
    { id: '2', ticket: 'CD456UV89', status: 'Pending', result: '-' },
    { id: '3', ticket: 'EF789WZ12', status: 'Settled', result: 'No Win' },
    { id: '4', ticket: 'GH012MN34', status: 'Settled', result: 'No Win' },
    { id: '5', ticket: 'IJ345PQ67', status: 'Settled', result: 'Won' }
  ];

  return (
    <div className="lottery-page">
      <div className="lottery-container">
        <div className="prize-section">
          <h1>Daily Lottery</h1>
          <p className="lottery-subtitle">Try your luck and win big prizes!</p>
          <div className="jackpot-amount">
            <div className="lottery-prize">₹1,00,000</div>
          </div>
          <div className="prize-info">
            <div className="info-item">
              <span className="label">Draw Date:</span>
              <span className="value">Daily at 5:00 PM</span>
            </div>
            <div className="info-item">
              <span className="label">Ticket Price:</span>
              <span className="value">₹500</span>
            </div>
          </div>
          <button className="rules-btn" onClick={scrollToRules}>
            <span className="rules-icon">📋</span>
            <span>How to Play</span>
          </button>
        </div>

        <div className="ticket-section">
          <h3>Purchase Ticket</h3>
          <div className="ticket-options">
            <button className="buy-ticket" onClick={handleBuyNow}>
              Buy Now
            </button>
            <p className="ticket-note">Purchase your ticket before draw time</p>
          </div>
        </div>

        <div className="results-section">
          <h3>Lottery Results</h3>
          <div className="results-buttons">
            <button className="result-btn today-result" onClick={handleTodayResult}>
              <span className="result-icon">🏆</span>
              <span className="result-text">Today's Result</span>
            </button>
            <button className="result-btn previous-result" onClick={handlePreviousResults}>
              <span className="result-icon">📜</span>
              <span className="result-text">Previous Results</span>
            </button>
          </div>
        </div>

        <div className="ticket-history-section">
          <h3>Your Tickets</h3>
          <div className="table-container">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Ticket</th>
                  <th>Status</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {ticketData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.ticket}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={item.result.includes('Won') ? 'winning-result' : ''}>
                      {item.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rules-section" ref={rulesRef}>
          <h3>How to Play</h3>
          <ul>
            <li>Purchase a ticket before the daily draw</li>
            <li>Each ticket has a unique number</li>
            <li>Winners are announced at 5:00 PM daily</li>
            <li>Multiple tickets increase your chances</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
