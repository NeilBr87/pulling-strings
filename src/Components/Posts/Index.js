import React, { useEffect, useState } from 'react';
import './style.css';

const FetchGovernmentPosts = (props) => {
  const [governmentPosts, setGovernmentPosts] = useState([]);
  const [oppositionPosts, setOppositionPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  function backToKB() {
    props.setPicker("");
  }

  useEffect(() => {
    fetch('https://members-api.parliament.uk/api/Posts/GovernmentPosts', {
      method: 'GET',
      headers: { accept: 'text/plain' }
    })
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result)) {
          const parsed = result.map(item => item.value);
          setGovernmentPosts(parsed);
        } else {
          console.warn('Unexpected API response:', result);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching government posts:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('https://members-api.parliament.uk/api/Posts/OppositionPosts', {
      method: 'GET',
      headers: { accept: 'text/plain' }
    })
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result)) {
          const parsed = result.map(item => item.value);
          setOppositionPosts(parsed);
        } else {
          console.warn('Unexpected API response:', result);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching opposition posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  const renderPostCard = (post, backgroundColor) => {
    const postHolder = post.postHolders?.[0]?.member?.value;
    if (!postHolder) return null;

    return (
      <div
        id="card"
        key={post.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          marginBottom: '2vh',
          border: '2px solid white',
          borderRadius: '10px',
          padding: '1vh',
          backgroundColor,
          color: 'white',
          gap: '-10px'
        }}
      >
        <img
          src={postHolder.thumbnailUrl}
          alt={postHolder.nameDisplayAs}
          style={{
            border: '2px solid white',
            display: 'block',
            margin: '0 auto 1vh',
            borderRadius: '50%',
            width: '20vw',
          }}
        />
        <h3>{post.name}</h3>
        <p>
          <strong>{postHolder.nameFullTitle}</strong> ({postHolder.gender})
        </p>
        <p>{postHolder.latestParty?.name}</p>
        <p>{postHolder.latestHouseMembership?.membershipFrom}</p>
      </div>
    );
  };

  return (
    <div id="listOfPosts">
      <h3>Government Posts</h3>
      <button onClick={backToKB} style={{marginBottom: '4vh'}} className="backButton">Back</button>
      {governmentPosts.length === 0 ? (
        <p>No government posts found.</p>
      ) : (
        <div style={{ listStyleType: 'none', padding: 0 }}>
          {governmentPosts.map(post => (
            <div key={post.id}>{renderPostCard(post, '#CB0036')}</div>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: '4vh' }}>Opposition Posts</h2>
      {oppositionPosts.length === 0 ? (
        <p>No opposition posts found.</p>
      ) : (
        <div style={{ listStyleType: 'none', padding: 0 }}>
          {oppositionPosts.map(post => (
            <div key={post.id}>{renderPostCard(post, '#0072b9')}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchGovernmentPosts;
