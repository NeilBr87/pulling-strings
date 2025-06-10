import { useEffect, useState } from 'react';

export default function Parties(props) {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);

  function backToKB() {
    props.setPicker("");
  }

  useEffect(() => {
    fetch('https://members-api.parliament.uk/api/Parties/GetActive/1', {
      method: 'GET',
      headers: {
        accept: 'text/plain'
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result && Array.isArray(result.items)) {
          const parsed = result.items.map(item => item.value);
          setParties(parsed);
        } else {
          console.warn('Unexpected API structure:', result);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Active UK Parties</h2>
            <button onClick={backToKB} style={{marginBottom: '4vh'}} className="backButton">Back</button>

      {parties.length === 0 ? (
        <p>No party data available.</p>
      ) : (
        <ul>
          {parties.map(party => (
            <li
              key={party.id}
              style={{
                backgroundColor: party.backgroundColour
                  ? `#${party.backgroundColour}`
                  : '#ffffff',
                color: party.foregroundColour
                  ? `#${party.foregroundColour}`
                  : '#000000',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px'
              }}
            >
              <strong>{party.name}</strong> ({party.abbreviation})<br />
              Lords Main Party: {party.isLordsMainParty ? 'Yes' : 'No'}<br />
              Lords Spiritual: {party.isLordsSpiritualParty ? 'Yes' : 'No'}<br />
              Independent: {party.isIndependentParty ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};