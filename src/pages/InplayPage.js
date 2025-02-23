import React, { useState, useEffect } from 'react';
import MatchTable from '../components/MatchTable';
import Banner from '../components/Banner';
// import { httpHelpers } from "../services/httpHelpers";
import './InplayPage.css';

const InplayPage = ({ logout = () => {} }) => {
  const [matches, setMatches] = useState({});
  // const api = httpHelpers();
  // const getLiveGames = "/gamma/getAllMatches?sportType=";
  const sports = ['cricket', 'soccer', 'tennis', 'basketball', 'volleyball'];

  const fetchLiveMatches = async () => {
    const updatedMatches = {};
      // try {
      //   const response = await api.get(`${getLiveGames}${sport}&matchStatus=LIVE`);
      //   updatedMatches= response?.data?.length > 0 ? response.data : [];
      // } catch (err) {
      //   console.error(`Error fetching live matches for ${sport}:`, err);
      //   if (err?.response?.status === 401) logout();
      //   updatedMatches= [];
      // }
    
    setMatches(updatedMatches);
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  return (
    <div className="inplay-page">
      <Banner />
      {sports.map((sport) => (
        matches[sport] && matches[sport].length > 0 ? (
          <div key={sport} className="sport-section">
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
      {Object.values(matches).every(sportMatches => sportMatches.length === 0) && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '18px', marginTop: '20px' }}>
         No live matches are currently available        
        </p>
      )}
    </div>
  );
};

export default InplayPage;
