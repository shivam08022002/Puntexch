import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchTable from '../components/MatchTable';
import './SportPage.css';
import { httpHelpers } from "../services/httpHelpers";
import {
  CRICKET
} from '../common/constants';

const SportPage = ({ isLoggedIn, logOut, selectedSport }) => {
  console.log("selectedSport", selectedSport);
  const getLiveGames = "/gamma/getAllMatches";
  const [matches, setMatches] = useState(null);
  const api = httpHelpers();
  let navigate = useNavigate();

  const fetchCricketMatches = async () => {
    api
      .get(`${getLiveGames}` + `${selectedSport != "inplay" ? '?sportType=' + selectedSport : ''}` + '&matchStatus=LIVE')
      .then(res => {
        console.log("live games 1", res);
        if (res && res.data && res.data.length > 0) {
          console.log("live games 2", res.data);
          setMatches(res.data);
        } else {
          setMatches(null);
        }
        console.log("live games 3", matches);
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
    if (isLoggedIn)
      fetchCricketMatches();
  }, [selectedSport]);

  const currentSportName = selectedSport ? selectedSport.toLowerCase() : '';

  // Define banners for each sport
  const banners = {
    cricket: {
      title: "Cricket Live",
      tagline: "Experience the Thrill of the Game",
      // background: "linear-gradient(45deg, #ff4444, #ff6b6b)",
      // icon: "🏏",
      bgImage: "https://t3.ftcdn.net/jpg/08/41/19/60/360_F_841196054_kcxsM3eaUWER06YEGygooW46zyl4aqj0.jpg"
    },
    football: {
      title: "Football Matches",
      tagline: "The Beautiful Game Awaits",
      // background: "linear-gradient(45deg, #4444ff, #6b6bff)",
      // icon: "⚽",
      bgImage: "https://www.shutterstock.com/image-illustration/abstract-silhouette-football-soccer-player-600nw-2293156091.jpg"
    },
    tennis: {
      title: "Tennis Live",
      tagline: "Serve, Rally, Score",
      // background: "linear-gradient(45deg, #44ff44, #6bff6b)",
      // icon: "🎾",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-tennis-player-on-260nw-2170057791.jpg"
    },
    basketball: {
      title: "Basketball Live",
      tagline: "Feel the Rhythm of the Game",
      // background: "linear-gradient(45deg, #ff8c00, #ffa500)",
      // icon: "🏀",
      bgImage: "https://t4.ftcdn.net/jpg/04/88/65/81/360_F_488658114_B8vBzGIbzYY9EtmCMqdl5ZMTucUsvkGs.jpg"
    },
    volleyball: {
      title: "Volleyball Live",
      tagline: "Spike Your Way to Victory",
      // background: "linear-gradient(45deg, #9932cc, #ba55d3)",
      // icon: "🏐",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-volleyball-player-on-260nw-2181473969.jpg"
    }
  };

  // Get current sport's banner and data
  const currentBanner = banners[currentSportName];

  // Only render if we have a valid sport
  if (!currentBanner) {
    return null;
  }

  return (
    <div className="sport-page">
      <div
        className="sport-banner"
        style={{ backgroundImage: `url(${currentBanner.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="banner-content">
          <div className="banner-icon">{currentBanner.icon}</div>
          <div className="banner-text">
            <h1>{currentBanner.title}</h1>
            <p>{currentBanner.tagline}</p>
          </div>
        </div>
      </div>

      {matches &&<div className="sport-content">
        <MatchTable
          sport={{
            name: currentSportName,
            displayName: currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)
          }}
          matches={matches}
        />
      </div>}
    </div>
  );
};

export default SportPage;
