import React, { useState, useEffect } from "react";

export default function Talks() {
  const [talks, setTalks] = useState([]); // Default list of talks
  const [keyword, setKeyword] = useState(""); // Search keyword
  const [session, setSession] = useState("all"); // Session filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalks = (searchTerm = "", selectedSession = "all") => {
      let url = `http://localhost:3001/talks`;
    
      const params = [];
      if (selectedSession.toLowerCase() !== "all") {
        params.push(`session=${encodeURIComponent(selectedSession)}`);
      }
      if (searchTerm.trim()) {
        params.push(`speaker=${encodeURIComponent(searchTerm)}`);
      }
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
    
      setLoading(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTalks(data);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching talks:", error);
          setError(error.message);
          setLoading(false);
        });
    };
    
    // Debounce search and session changes
    const timeoutId = setTimeout(() => {
      fetchTalks(keyword, session);
    }, 300);

    return () => clearTimeout(timeoutId); // Cleanup debounce timeout
  }, [keyword, session]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Talks</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by speaker's name"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-3 md:mb-0"
        />
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded"
        >
          <option value="all">All Sessions</option>
          <option value="A">Session A</option>
          <option value="B">Session B</option>
          <option value="C">Session C</option>
        </select>
      </div>
      {loading && <p className="text-center">Loading talks...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && talks.length === 0 && (
        <p className="text-center mt-4 text-gray-600">
          No results found
          {keyword && ` for "${keyword}"`}
          {session !== "all" && ` in ${session}`}.
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 mt-5">
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
