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
import BallByBallMarket from '../components/BallByBallMarket';
import SessionMarket from '../components/SessionMarket';
import OddsMarket from '../components/OddsMarket';
import PlaceBetDialog from '../components/PlaceBetDialog';
import { toast } from 'react-hot-toast';
import CustomToastWithOverlay from '../components/CustomToastWithOverlay';

const MatchDetailsPage = ({ isLoggedIn, logOut }) => {
  const location = useLocation();
  const { action } = location.state || {};

  const [selectedTab, setSelectedTab] = useState('scoreboard');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const { id } = useParams();

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
                setMatchDetails(res.data.matchScore);
              }
              if (res.data.videoLink && !videoLink) {
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

  const renderMarketContent = () => {
    switch (selectedMarket) {
      case 'all':
        return (
          <div className="all-markets">
            {fancyContainer && fancyContainer.marketList && fancyContainer.marketList.length > 0 && <SessionMarket marketType={FANCY_BET} oddsList={fancyContainer.marketList} minBet={fancyContainer.minBet} maxBet={fancyContainer.maxBet} waitTime={fancyContainer.waitTime} />}
            <BallByBallMarket />
          </div>
        );
      case 'Session':
        return <div>{fancyContainer && fancyContainer.marketList && fancyContainer.marketList.length > 0 && <SessionMarket marketType={FANCY_BET} oddsList={fancyContainer.marketList} minBet={fancyContainer.minBet} maxBet={fancyContainer.maxBet} waitTime={fancyContainer.waitTime} />}</div>
      case 'ball':
        return <BallByBallMarket />;
      default:
        return null;
    }
  };

  const [showPlaceBetDialog, setShowPlaceBetDialog] = useState();
  const [betType, setBetType] = useState();
  const [marketType, setMarketType] = useState();
  const [candidateRate, setCandidateRate] = useState();
  const [nation, setNation] = useState();
  const [candidate, setCandidate] = useState();
  const [backSelected, setBackSelected] = useState();
  const [waitTime, setWaitTime] = useState();
  const [candidateMarketId, setCandidateMarketId] = useState();
  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();

  function onMarketPositionClick(betType, marketType, candidateRate, nation, candidate, waitTime, backSelected, marketId, yesValue, noValue) {
    console.log("onMarketPositionClick", "onMarketPositionClick")
    setShowPlaceBetDialog(true);
    setBetType(betType);
    setMarketType(marketType);
    setCandidateRate(candidateRate);
    setNation(nation);
    setCandidate(candidate);
    setWaitTime(waitTime);
    setBackSelected(backSelected);
    setCandidateMarketId(marketId);
    setYesValue(yesValue);
    setNoValue(noValue);
  }

  function showToastMessage(message, success) {
    // showToast();
    const toastId = toast.custom(
      (t) => (
        <CustomToastWithOverlay
          message={message}
          onClose={() => toast.dismiss(toastId)}
          success={success}
        />
      ),
      {
        position: 'top-center', // Center the toast
        duration: 2000, // Auto close after 5 seconds
      }
    );

    // Ensure auto-close by using explicit timeout
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 10);
  }

  return (
    <div className="match-details-container">
      {showPlaceBetDialog && preBetPreferenceData && <PlaceBetDialog logOut={logOut} yesValue={yesValue} noValue={noValue} showToastMessage={showToastMessage} candidateMarketId={candidateMarketId} waitTime={waitTime} backSelected={backSelected} betType={betType} marketType={marketType} candidateRate={candidateRate} nation={nation} candidate={candidate} setShowPlaceBetDialog={setShowPlaceBetDialog} preBetPreferenceData={preBetPreferenceData}></PlaceBetDialog>}
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
      <div className="match-detail-container">
        {matchResponse && <div className="match-details-content" style={{ display: 'flex', flexDirection: 'column' }} >
          <div className={`match-details-main ${selectedTab === 'scoreboard' ? 'active' : ''}`}>

            <div className="graph-section" >
              <div className="scrbrd-container" >
                <iframe style={{ width: '100%', height: '100%', margin: '0 ', padding: '0' }}
                  // src="https://www.flashscore.com/match/1J1Q6Q8b" title="/" frameborder="0" scrolling="no"
                  src={matchDetails}
                  title={matchResponse && matchResponse.name}
                />
              </div>
            </div>
          </div>
          <div className={`live-tv-section ${selectedTab === 'tv' ? 'active' : ''}`}>
            <div className="tv-container">
              {/* <div className="live-tv-content"> */}
              {videoLink ? (
                <iframe style={{ width: '100%', height: '100%', margin: '0 ', padding: '0' }}
                  src={videoLink}
                  title="Live Stream"
                  className="live-stream-frame"
                  allowFullScreen
                />
              ) : (
                <div className="no-stream-message">
                  <span>Live stream not available</span>
                </div>
              )}

              {/* </div> */}
            </div>
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
        }

        {tossContainer && tossContainer.marketList && tossContainer.marketList.length > 0 && <OddsMarket onMarketPositionClick={onMarketPositionClick} marketType={TOSS_ODDS} oddsList={tossContainer.marketList} minBet={tossContainer.minBet} maxBet={tossContainer.maxBet} waitTime={tossContainer.waitTime} />}
        {matchOddsContainer && matchOddsContainer.marketList && matchOddsContainer.marketList.length > 0 && <OddsMarket onMarketPositionClick={onMarketPositionClick} marketType={MATCH_ODDS} oddsList={matchOddsContainer.marketList} minBet={matchOddsContainer.minBet} maxBet={matchOddsContainer.maxBet} waitTime={matchOddsContainer.waitTime} />}
        {bookmakerOddsContainer && bookmakerOddsContainer.marketList && bookmakerOddsContainer.marketList.length > 0 && <OddsMarket onMarketPositionClick={onMarketPositionClick} marketType={BOOKMAKER} oddsList={bookmakerOddsContainer.marketList} minBet={bookmakerOddsContainer.minBet} maxBet={bookmakerOddsContainer.maxBet} waitTime={bookmakerOddsContainer.waitTime} />}

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
    </div>
  );
};

export default MatchDetailsPage;