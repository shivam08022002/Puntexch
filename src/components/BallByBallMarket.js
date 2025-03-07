import { FaCheck } from 'react-icons/fa';

export default function BallByBallMarket() {
    <div className="market-section">
        <div className="market-header">
            <div className="market-title">Ball By Ball
                <FaCheck className="check-icon" />
            </div>

            {/* <div className="market-actions">
          <button className="action-btn"><FaExchangeAlt /></button>
          <button className="action-btn"><FaChartLine /></button>
          <button className="action-btn"><FaLock /></button>
        </div> */}
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
};