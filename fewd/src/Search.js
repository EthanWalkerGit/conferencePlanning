import React, { useState, useEffect } from "react";

export default function Talks() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword.trim()) {
        fetchTalks(keyword);
      } else {
        setResults([]); // Clear results if search is empty
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId); // Cleanup debounce timeout
  }, [keyword]);

  const fetchTalks = (searchTerm) => {
    fetch(`http://localhost:3001/talks/speaker/${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Talks</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by speaker's name"
        className="w-full p-2 border border-gray-300 rounded mb-5"
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 gap-4 mt-5">
        {results.length === 0 && !error && keyword.trim() && (
          <p className="text-center mt-4 text-gray-600">
            No results found for "{keyword}".
          </p>
        )}
        {results.map((talk) => (
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
