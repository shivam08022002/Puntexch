import React from 'react';
import MatchTable from '../components/MatchTable';
import Banner from '../components/Banner'; // Import the Banner component
import './InplayPage.css';

const InplayPage = () => {
  // Sports data for the inplay page
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

  // Sports display order
  const sportsOrder = ['cricket', 'soccer', 'tennis', 'basketball', 'volleyball'];

  return (
    <div className="inplay-page">
      <Banner /> 
      {sportsOrder.map((sport) => (
        <div key={sport} className="sport-section">
          <MatchTable
            sport={{
              name: sport,
              displayName: sport.charAt(0).toUpperCase() + sport.slice(1),
              count: sportsData[sport]?.length.toString() || "0"
            }}
            matches={sportsData[sport] || []}
          />
        </div>
      ))}
    </div>
  );
};

export default InplayPage;