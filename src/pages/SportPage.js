import React from 'react';
import { useParams } from 'react-router-dom';
import MatchTable from '../components/MatchTable';
import './SportPage.css';


const SportPage = () => {
  const { sportName } = useParams();
  const currentSportName = sportName ? sportName.toLowerCase() : '';

  // Define banners for each sport
  const banners = {
    cricket: {
      title: "Cricket Live",
      tagline: "Experience the Thrill of the Game",
      // background: "linear-gradient(45deg, #ff4444, #ff6b6b)",
      // icon: "🏏",
      bgImage: "https://t3.ftcdn.net/jpg/08/41/19/60/360_F_841196054_kcxsM3eaUWER06YEGygooW46zyl4aqj0.jpg"
    },
    soccer: {
      title: "Soccer Matches",
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

  // Sports data for each sport
  const sportsData = {
    cricket: [
      {
        tournament: "Womens One Day Internationals",
        teams: "West Indies Women v Bangladesh Women",
        date: "Jan 19",
        time: "11:30 PM",
        odds: {
          back1: "1.51",
          lay1: "1.52",
          back2: "-",
          lay2: "-",
          back3: "2.94",
          lay3: "2.98"
        },
        minBet: "100",
        maxBet: "25K"
      }
    ],
    soccer: [
      {
        tournament: "French Ligue 1",
        teams: "Marseille v Strasbourg",
        date: "Jan 20",
        time: "1:15 AM",
        odds: {
          back1: "2.6",
          lay1: "2.62",
          back2: "2.08",
          lay2: "2.1",
          back3: "7.2",
          lay3: "7.4"
        },
        minBet: "100",
        maxBet: "500K"
      }
    ],
    tennis: [
      {
        tournament: "Australian Open",
        teams: "Djokovic vs Medvedev",
        date: "Jan 19",
        time: "2:30 PM",
        odds: {
          back1: "1.45",
          lay1: "1.48",
          back2: "2.8",
          lay2: "2.85",
          back3: "3.2",
          lay3: "3.3"
        },
        minBet: "100",
        maxBet: "50K"
      }
    ],
    basketball: [
      {
        tournament: "NBA",
        teams: "Lakers vs Warriors",
        date: "Jan 19",
        time: "9:30 PM",
        odds: {
          back1: "2.1",
          lay1: "2.15",
          back2: "1.85",
          lay2: "1.9",
          back3: "2.5",
          lay3: "2.6"
        },
        minBet: "100",
        maxBet: "75K"
      }
    ],
    volleyball: [
      {
        tournament: "World League",
        teams: "Brazil vs Poland",
        date: "Jan 19",
        time: "4:00 PM",
        odds: {
          back1: "1.95",
          lay1: "2.0",
          back2: "1.9",
          lay2: "1.95",
          back3: "2.2",
          lay3: "2.3"
        },
        minBet: "100",
        maxBet: "25K"
      }
    ]
  };

  // Get current sport's banner and data
  const currentBanner = banners[currentSportName];
  const currentSportData = sportsData[currentSportName] || [];

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

      <div className="sport-content">
        <MatchTable
          sport={{
            name: currentSportName,
            displayName: currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1),
            count: currentSportData.length.toString()
          }}
          matches={currentSportData}
        />
      </div>
    </div>
  );
};

export default SportPage;
