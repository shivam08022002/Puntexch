import {
    MARKET_FANCY_BET,
} from "../common/constants";

export default function SessionMarket({ onMarketPositionClick, marketType, oddsList, minBet, maxBet, waitTime }) {
    let hasOdds = false;

    if (oddsList.length > 0)
        hasOdds = true;

    const handleSessionClick = (e, index, rate, type, marketId, yesValue, noValue, nation) => {
        e.preventDefault();
        onMarketPositionClick(MARKET_FANCY_BET, marketType, rate, nation, type, waitTime, true, marketId, yesValue, noValue);
    };
    return (
        <div>
            {hasOdds && <div className="market-section">
                <div className="market-header">
                    <div className="market-title">
                        Session Market
                        {/* <FaCheck className="check-icon" /> */}
                    </div>
                    {/* <div className="market-actions">
              <button className="action-btn"><FaExchangeAlt /></button>
              <button className="action-btn"><FaChartLine /></button>
              <button className="action-btn"><FaLock /></button>
            </div> */}
                </div>
                <div className="odds-table">
                    <div className="table-header">
                        <div className="match-type-header">Session</div>
                        <div className="back-header">
                            <div>No</div>
                        </div>
                        <div className="lay-header">
                            <div>Yes</div>
                        </div>
                    </div>
                    {oddsList.map((team, index) => (<div className="team-row">
                        <div className="team-name">{team.marketName}</div>
                        <div key={team.noRate + team.noValue + index + "no"}
                            className="flash-blue">
                            <div className="odds-box back"
                                onClick={(e) => handleSessionClick(e, index, team.noRate, "no", team.marketId, team.yesValue, team.noValue, team.marketName)}>
                                <span className="price">{team.noValue}</span>
                                <span className="amount">{team.noRate}</span>
                            </div>
                        </div>
                        <div key={team.yesRate + team.yesValue + index + "yes"}
                            className="flash-blue">
                            <div className="odds-box lay"
                                onClick={(e) => handleSessionClick(e, index, team.yesRate, "yes", team.marketId, team.yesValue, team.noValue, team.marketName)}>
                                <span className="price">{team.yesValue}</span>
                                <span className="amount">{team.yesRate}</span>
                            </div>
                        </div>
                    </div>))}
                    <div className="bet-limits">
                        Min: {minBet} | Max: {maxBet}
                    </div>
                </div>
            </div>}
        </div>
    )
};