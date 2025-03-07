import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchTable from '../components/MatchTable';
import './SportPage.css';
import { httpHelpers } from "../services/httpHelpers";
import PlaceBetDialog from '../components/PlaceBetDialog';
import { toast } from 'react-hot-toast';
import CustomToastWithOverlay from '../components/CustomToastWithOverlay';

const SportPage = ({ isLoggedIn, logOut, selectedSport }) => {
  console.log("selectedSport", selectedSport);
  const getLiveGames = "/gamma/getAllMatches";
  const [matches, setMatches] = useState(null);
  const [matchType, setMatchType] = useState('LIVE');
  const [loading, setLoading] = useState(true);
  const api = httpHelpers();
  let navigate = useNavigate();

  // Treat "inplay" as "cricket" for API calls
  const sportForApi = selectedSport === "inplay" ? "cricket" : selectedSport;

  const fetchMatches = async (type, sport) => {
    setLoading(true);
    let endpoint = `${getLiveGames}?sportType=${sport}&matchStatus=${type}`;

    api
      .get(endpoint)
      .then(res => {
        if (res?.data?.length > 0) {
          setMatches(res.data);
        } else {
          setMatches(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setMatches(null);
        setLoading(false);
        if (err?.response?.status === 401) {
          logOut();
        }
      });
  };

  // ✅ Fix: Run API on first load if "inplay" is selected by default
  useEffect(() => {
    if (isLoggedIn) {
      setMatchType('LIVE');

      // Always fetch matches when the component first mounts
      fetchMatches('LIVE', sportForApi);
    }
  }, [isLoggedIn]); // Runs only once when the component mounts

  // ✅ Also fetch data if user switches to a different sport
  useEffect(() => {
    if (isLoggedIn && selectedSport !== "inplay") {
      fetchMatches('LIVE', sportForApi);
    }
  }, [selectedSport]); // Runs when selectedSport changes

  const handleMatchTypeChange = (type) => {
    setMatchType(type);
    fetchMatches(type, sportForApi);
  };

  const currentSportName = selectedSport === "inplay" ? "cricket" : selectedSport.toLowerCase();

  // Sport Banners
  const banners = {
    cricket: {
      title: "Cricket Live",
      tagline: "Experience the Thrill of the Game",
      bgImage: "https://t3.ftcdn.net/jpg/08/41/19/60/360_F_841196054_kcxsM3eaUWER06YEGygooW46zyl4aqj0.jpg"
    },
    football: {
      title: "Football Matches",
      tagline: "The Beautiful Game Awaits",
      bgImage: "https://www.shutterstock.com/image-illustration/abstract-silhouette-football-soccer-player-600nw-2293156091.jpg"
    },
    tennis: {
      title: "Tennis Live",
      tagline: "Serve, Rally, Score",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-tennis-player-on-260nw-2170057791.jpg"
    },
    basketball: {
      title: "Basketball Live",
      tagline: "Feel the Rhythm of the Game",
      bgImage: "https://t4.ftcdn.net/jpg/04/88/65/81/360_F_488658114_B8vBzGIbzYY9EtmCMqdl5ZMTucUsvkGs.jpg"
    },
    volleyball: {
      title: "Volleyball Live",
      tagline: "Spike Your Way to Victory",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-volleyball-player-on-260nw-2181473969.jpg"
    }
  };

  const currentBanner = banners[currentSportName] || banners['cricket'];

  const [showPlaceBetDialog, setShowPlaceBetDialog] = useState();
  const [preBetPreferenceData, setPreBetPreferenceData] = useState();
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

  function onMarketPositionClick(preBetPreferenceData, betType, marketType, candidateRate, nation, candidate, waitTime, backSelected, marketId, yesValue, noValue) {
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
    <div className="sport-page">
      {showPlaceBetDialog && preBetPreferenceData && <PlaceBetDialog logOut={logOut} yesValue={yesValue} noValue={noValue} showToastMessage={showToastMessage} candidateMarketId={candidateMarketId} waitTime={waitTime} backSelected={backSelected} betType={betType} marketType={marketType} candidateRate={candidateRate} nation={nation} candidate={candidate} setShowPlaceBetDialog={setShowPlaceBetDialog} preBetPreferenceData={preBetPreferenceData}></PlaceBetDialog>}
      {selectedSport !== "inplay" && (
        <div
          className="sport-banner"
          style={{ backgroundImage: `url(${currentBanner.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="banner-content">
            <div className="banner-text">
              <h1>{currentBanner.title}</h1>
              <p>{currentBanner.tagline}</p>
            </div>
          </div>
        </div>
      )}

      <div className="sport-content">
        {loading ? (
          <div className="loading-message">
            <h3>Loading {currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)} Matches...</h3>
          </div>
        ) : matches ? (
          <MatchTable
            sport={{
              name: currentSportName,
              displayName: currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)
            }}
            matches={matches}
            matchType={matchType}
            onMatchTypeChange={handleMatchTypeChange}
            onMarketPositionClick={onMarketPositionClick}
          />
        ) : (
          <div className="no-matches-message">
            <h3>{currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)} Matches Currently Unavailable</h3>
            <p>Please check back later for {matchType.toLowerCase()} matches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportPage;
