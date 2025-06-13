import React, { useEffect, useState } from 'react';

const DivisionVotes = () => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://commonsvotes-api.parliament.uk/data/divisions.json/groupedbyparty', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDivisions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Parliament Division Votes</h1>
      {divisions.map((division) => {
        const passed = division.AyeCount > division.NoCount;
        const backgroundColor = passed ? '#d4edda' : '#f8d7da'; // green/red pastel
        const borderColor = passed ? '#28a745' : '#dc3545'; // green/red border

        return (
          <div
            key={division.DivisionId}
            style={{
              backgroundColor,
              border: `2px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}
          >
            <h2>{division.Title}</h2>
            <p><strong>Date:</strong> {new Date(division.Date).toLocaleString()}</p>
            <p><strong>Result:</strong> {passed ? '✅ Passed' : '❌ Failed'}</p>

            <p><strong>Ayes:</strong> {division.AyeCount}</p>
            <ul>
              {division.Ayes.map((party, index) => (
                <li key={index}>{party.PartyName}: {party.VoteCount}</li>
              ))}
            </ul>

            <p><strong>Noes:</strong> {division.NoCount}</p>
            <ul>
              {division.Noes.map((party, index) => (
                <li key={index}>{party.PartyName}: {party.VoteCount}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DivisionVotes;
