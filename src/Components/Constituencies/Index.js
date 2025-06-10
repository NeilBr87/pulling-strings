import React, { useEffect, useState } from 'react';

export default function Constituencies() {
  const [constituencies, setConstituencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://members-api.parliament.uk/api/Location/Constituency/Search?skip=0&take=20', {
      method: 'GET',
      headers: { accept: 'text/plain' }
    })
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result.items)) {
          setConstituencies(result.items.map(item => item.value));
        } else {
          console.warn('Unexpected API response:', result);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching constituencies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading constituencies...</p>;

  const renderConstituencyCard = (constituency) => {
    const member = constituency.currentRepresentation?.member?.value;
    if (!member) return null;

    return (
      <div
        key={constituency.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          marginBottom: '2vh',
          border: '2px solid white',
          borderRadius: '10px',
          padding: '1vh',
          backgroundColor: `#${member.latestParty?.backgroundColour || '333'}`,
          color: `#${member.latestParty?.foregroundColour || 'fff'}`,
        }}
      >
        <img
          src={member.thumbnailUrl}
          alt={member.nameDisplayAs}
          style={{
            border: '2px solid white',
            margin: '0 auto 1vh',
            borderRadius: '50%',
            width: '20vw',
          }}
        />
        <h3>{constituency.name}</h3>
        <p><strong>{member.nameFullTitle}</strong> ({member.gender})</p>
        <p>Party: {member.latestParty?.name}</p>
        <p>Constituency since: {new Date(member.latestHouseMembership?.membershipStartDate).toLocaleDateString()}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>UK Parliamentary Constituencies</h2>
      {constituencies.length === 0 ? (
        <p>No constituencies found.</p>
      ) : (
        <div>
          {constituencies.map(c => renderConstituencyCard(c))}
        </div>
      )}
    </div>
  );
};

