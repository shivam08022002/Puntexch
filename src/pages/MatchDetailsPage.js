import React, { useState, useEffect } from 'react';
import { FaExchangeAlt, FaChartLine, FaLock, FaTv, FaCheck } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import './MatchDetailsPage.css';
import { clearMessage } from "../actions/message";
import { useDispatch, useSelector } from "react-redux";
import { httpHelpers } from "../services/httpHelpers";
import {
  MATCH_ODDS,
  BOOKMAKER,
  FANCY_BET,
  TOSS_ODDS,
  BACK,
  LAY,
  NO,
  YES,
  TIED_MATCH,
  DRAW_MATCH
} from '../common/constants';

// Odds Market
const OddsMarket = ({ marketType, oddsList }) => {
  let teamA;
  let teamB;
  let theDraw;
  let tiedYes;
  let tiedNo;

  let hasOdds = false;

  oddsList.forEach((odds) => {
    // console.log("market bet panel", odds.nation);
    if (odds.nation === "Yes" || odds.nation === "YES") {
      if (odds.marketName === "Tied Match" || odds.marketName === "TIED_MATCH") {
        hasOdds = true;
        tiedYes = odds;
      }
    } else if (odds.nation === "No" || odds.nation === "NO") {
      if (odds.marketName === "Tied Match" || odds.marketName === "TIED_MATCH") {
        hasOdds = true;
        tiedNo = odds;
      }
    } else if (odds.nation !== "No" && odds.nation !== "NO"
      && odds.nation !== "Yes" && odds.nation !== "YES") {
      if (odds.nation === DRAW_MATCH) {
        hasOdds = true;
        theDraw = odds;
      } else if (teamA) {
        hasOdds = true;
        teamB = odds;
      } else {
        hasOdds = true;
        teamA = odds;
      }
    }
  });

  let teams = null;
  let tied = null;

  if (teamA && teamB) {
    teams = [
      {
        name: teamA.nation, backRate: teamA.backRate, backStake: teamA.backStake,
        layRate: teamA.layRate, layStake: teamA.layStake, status: teamA.status,
        marketId: teamA.marketId, userPosition: teamA.userPosition
      },
      {
        name: teamB.nation, backRate: teamB.backRate, backStake: teamB.backStake,
        layRate: teamB.layRate, layStake: teamB.layStake, status: teamB.status,
        marketId: teamB.marketId, userPosition: teamB.userPosition
      }
    ];

    if (theDraw) {
      teams.push({
        name: theDraw.nation, backRate: theDraw.backRate, backStake: theDraw.backStake,
        layRate: theDraw.layRate, layStake: theDraw.layStake, status: theDraw.status,
        marketId: theDraw.marketId, userPosition: theDraw.userPosition
      });
    }
  }

  if (tiedYes && tiedNo) {
    tied = [
      {
        name: tiedYes.nation, backRate: tiedYes.backRate, backStake: tiedYes.backStake,
        layRate: tiedYes.layRate, layStake: tiedYes.layStake, status: tiedYes.status,
        marketId: tiedYes.marketId, userPosition: tiedYes.userPosition
      },
      {
        name: tiedNo.nation, backRate: tiedNo.backRate, backStake: tiedNo.backStake,
        layRate: tiedNo.layRate, layStake: tiedNo.layStake, status: tiedNo.status,
        marketId: tiedNo.marketId, userPosition: tiedNo.userPosition
      }
    ];
  }

  // teams = [
  //     {
  //         name: "teamA.nation", backRate: 10, backStake: 20,
  //         layRate: 5, layStake: 15, status: "ACTIVE",
  //         marketId: "teamA.marketId", userPosition: 200
  //     },
  //     {
  //         name: "teamB.nation", backRate: 100, backStake: 200,
  //         layRate: 50, layStake: 150, status: "ACTIVE",
  //         marketId: "teamB.marketId", userPosition: 400
  //     }
  // ];

  <div className="market-section">
    <div className="market-header">
      <div className="market-title">
        {marketType}
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

        {teams && teams.map((team, index) => (
          <div className="team-row">
            <div className="team-name">{team.name}</div>
            <div className="odds-group">
              <div key={`back-${index}`} className="odds-box back">
                <span className="price">{team.backRate}</span>
                <span className="amount">{team.backStake}</span>
              </div>
            </div>
            <div className="odds-group">
              <div key={`lay-${index}`} className="odds-box lay">
                <span className="price">{team.layRate}</span>
                <span className="amount">{team.layStake}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="bet-limits">
          Min: 100 | Max: 100K
        </div>
      </div>
    </div>
  </div>
}

// Session Market Component
const SessionMarket = ({ oddsList }) => {
  let hasOdds = false;

  oddsList.forEach((odds, index) => {
    hasOdds = true;
  });

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
}

// Ball By Ball Component
const BallByBallMarket = () => {
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
}

const MatchDetailsPage = ({ isLoggedIn, logOut }) => {
  const [selectedTab, setSelectedTab] = useState('scoreboard');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const { id } = useParams();
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

  const [matchResponse, setMatchResponse] = useState();
  const [fancyContainer, setFancyContainer] = useState();
  const [matchOddsContainer, setMatchOddsContainer] = useState();
  const [bookmakerOddsContainer, setBookmakerContainer] = useState();
  const [tossContainer, setTossContainer] = useState();
  const [betsForMatch, setBetsForMatch] = useState();
  const [preBetPreferenceData, setPreBetPreferenceData] = useState();

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const api = httpHelpers();
  const getOFBRates = "/gamma/getMatchById?matchId=" + id;
  const [matchMarkets, setMatchMarkets] = useState();
  const [matchDetails, setMatchDetails] = useState();
  const [videoLink, setVideoLink] = useState();

  const fetchMatchMarkets = async () => {
    api
      .get(`${getOFBRates}`)
      .then(res => {
        console.log("live markets", res);
        if (res && res.data) {
          if (res.data.matchResponse) {
            setMatchResponse(res.data.matchResponse);
            if (res.data.matchResponse.matchStatus === "LIVE" || res.data.matchResponse.matchStatus === "UPCOMING") {
              if (res.data.matchOddsContainer) {
                setMatchOddsContainer(res.data.matchOddsContainer);
              } else {
                setMatchOddsContainer(null);
              }
              if (res.data.bookMakerOddsContainer) {
                setBookmakerContainer(res.data.bookMakerOddsContainer);
              } else {
                setBookmakerContainer(null);
              }
              if (res.data.fancyContainer) {
                setFancyContainer(res.data.fancyContainer);
              } else {
                setFancyContainer(null);
              }
              if (res.data.matchScore && !matchDetails) {
                console.log(res.data.matchScore);
                setMatchDetails(res.data.matchScore);
              }
              if (res.data.videoLink && !videoLink) {
                console.log(res.data.videoLink);
                setVideoLink(res.data.videoLink);
              }
              if (res.data.tossContainer) {
                setTossContainer(res.data.tossContainer);
              } else {
                setTossContainer(null);
              }
              if (res.data.betsForMatch) {
                setBetsForMatch(res.data.betsForMatch);
              } else {
                setBetsForMatch(null);
              }
              if (res.data.preBetPreferenceData) {
                setPreBetPreferenceData(res.data.preBetPreferenceData);
              } else {
                setPreBetPreferenceData(null);
              }
            } else {
              setMatchOddsContainer(null);
              setBookmakerContainer(null);
              setFancyContainer(null);
              setMatchDetails(null);
              setTossContainer(null);
              setBetsForMatch(null);
              setPreBetPreferenceData(null);
            }
          } else {
            setMatchResponse(null);
          }

        }
      })
      .catch(err => {
        console.log("error error", err);
        if (err) {
          if (err.data) {
            if (err.data.status && err.data.status === 401) {
              logOut();
            }
          } else if (err.response) {
            if (err.response.status && err.response.status === 401) {
              logOut();
            }
          }
        }
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
    window.scrollTo(0, 0);
    fetchMatchMarkets();
    const intervalId = setInterval(() => {
      fetchMatchMarkets();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
            {fancyContainer && fancyContainer.marketList && fancyContainer.marketList.length == 0 && <SessionMarket oddsList={fancyContainer.marketList} />}
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

      {matchResponse && <div className="match-details-content">
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
                <span>{matchResponse.openDate}</span>
                <span className="status">{matchResponse.matchStatus}</span>
              </div>
              <div className="match-teams">
                <h1>{matchResponse.name}</h1>
              </div>
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
          </div>
        </div>
      </div>}

      {tossContainer && tossContainer.marketList && tossContainer.marketList.length == 0 && <OddsMarket marketType={TOSS_ODDS} oddsList={tossContainer.marketList} />}
      {matchOddsContainer && matchOddsContainer.marketList && matchOddsContainer.marketList.length == 0 && <OddsMarket marketType={MATCH_ODDS} oddsList={matchOddsContainer.marketList} />}
      {bookmakerOddsContainer && bookmakerOddsContainer.marketList && bookmakerOddsContainer.marketList.length == 0 && <OddsMarket marketType={BOOKMAKER} oddsList={bookmakerOddsContainer.marketList} />}

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