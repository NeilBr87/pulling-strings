import React, { useEffect, useState } from 'react';

export default function Constituencies(props) {

  const [constituencies, setConstituencies] = useState([]);
  const [loading, setLoading] = useState(true);

    function backToKB() {
    props.setPicker("");
  }

  const fetchAllConstituencies = async () => {
    const batchSize = 50;
    let skip = 0;
    let allItems = [];
    let hasMore = true;

    try {
      while (hasMore) {
        const res = await fetch(`https://members-api.parliament.uk/api/Location/Constituency/Search?skip=${skip}&take=${batchSize}`, {
          headers: { accept: 'text/plain' }
        });
        const result = await res.json();

        if (Array.isArray(result.items) && result.items.length > 0) {
          allItems = [...allItems, ...result.items.map(item => item.value)];
          skip += batchSize;
        } else {
          hasMore = false;
        }
      }

      setConstituencies(allItems);
    } catch (error) {
      console.error('Error fetching constituencies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllConstituencies();
  }, []);

  if (loading) return <p>Loading constituencies...</p>;

  return (
    <div>
      <h2>UK Parliamentary Constituencies</h2>
      <button onClick={backToKB} style={{marginBottom: '4vh'}} className="backButton">Back</button>

      {constituencies.length === 0 ? (
        <p>No constituencies found.</p>
      ) : (
        constituencies.map(c => {
          const member = c.currentRepresentation?.member?.value;
          if (!member) return null;

          return (
            <div
              key={c.id}
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
              <h3>{c.name}</h3>
              <p><strong>{member.nameFullTitle}</strong> ({member.gender})</p>
              <p>Party: {member.latestParty?.name}</p>
              <p>Constituency since: {new Date(member.latestHouseMembership?.membershipStartDate).toLocaleDateString()}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

