import React, { useEffect, useState } from 'react';

const Spokespersons = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpokespersons = async () => {
      try {
        const response = await fetch(
          'https://members-api.parliament.uk/api/Posts/Spokespersons',
          {
            headers: {
              accept: 'text/plain',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpokespersons();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spokespersons</h1>
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li key={index} className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{post.value.name}</h2>
            <div className="mt-2">
              {post.value.postHolders.map((holder, idx) => (
                <div key={idx} className="text-gray-700">
                  <span className="font-medium">Holder:</span>{' '}
                  {holder.member.value.nameDisplayAs}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spokespersons;
