import React, { useState, useEffect } from 'react';

export default function Talks() {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/talks')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTalks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching talks:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading talks...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">Talks</h1>
      <div className="grid grid-cols-1 gap-4">
        {talks.map((talk) => (
          <div key={talk.id} className="bg-gray-200 p-4 rounded shadow">
            <h2 className="font-bold text-lg">{talk.title}</h2>
            <p className="font-semibold my-2">{talk.speaker}</p>
            <p>{talk.description}</p>
            <p className="mt-2">Session: {talk.session}</p>
            <p>Begins: {talk.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
