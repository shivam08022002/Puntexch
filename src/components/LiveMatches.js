import React, { useState, } from 'react';
import MatchTable from './MatchTable';
import './LiveMatches.css';
// import { httpHelpers } from "../services/httpHelpers";

const LiveMatches = ({ logout = () => {} }) => {
  const [matches, ] = useState({});
  // const api = httpHelpers();
  // const getLiveGames = "/gamma/getAllMatches?sportType=";
  const sports = ['cricket', 'soccer', 'tennis', 'basketball', 'volleyball'];

  // const fetchLiveMatches = async () => {
  //   const updatedMatches = {};
  //   for (const sport of sports) {
  //     try {

  //       const response = await api.get(`${getLiveGames}${sport}&matchStatus=LIVE`);
  //       console.log("shivam",response.data);
  //       updatedMatches[sport] = response?.data?.length > 0 ? response.data : [];
  //     } catch (err) {
  //       console.error(`Error fetching live matches for ${sport}:`, err);
  //       if (err?.response?.status === 401) logout();
  //       updatedMatches[sport] = [];
  //     }
  //   }
  //   setMatches(updatedMatches);
  // };

  // useEffect(() => {
  //   fetchLiveMatches();
  // }, []);

  return (
    <div className="live-matches-section">
      <div className="section-header">
        <h2>Live Matches</h2>
        <span className="live-indicator">
          <span className="live-dot"></span>
          LIVE
        </span>
      </div>
       {sports.map((sport) => (
        matches[sport] && matches[sport].length > 0 ? (
          <div key={sport} className="sport-matches">
            <MatchTable
              sport={{
                name: sport,
                displayName: sport.charAt(0).toUpperCase() + sport.slice(1),
                count: matches[sport]?.length.toString() || "0"
              }}
              matches={matches[sport] || []}
            />
          </div>
        ) : null
      ))} 
      {/* {Object.values(matches).every(sportMatches => sportMatches.length === 0) && (
        <p style={{ textAlign: 'center', color: 'White', fontSize: '18px', marginTop: '20px' }}>
          No live matches are currently available
        </p>
      )} */}
    </div>
  );
};

export default LiveMatches;
