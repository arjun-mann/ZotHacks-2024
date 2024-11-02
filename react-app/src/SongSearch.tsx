import React, { useState, useEffect } from "react";
import "./SongSearchPage.css"; // Import the CSS file for styling

function SongSearchPage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // State to store the back-end response

  // Function to handle search form submission
  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send the search term to the backend as a plain string
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain", // Set Content-Type to text/plain
        },
        body: searchTerm, // Send the search term as a plain string
      });

      if (!response.ok) {
        throw new Error("Failed to send search term to the backend");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Search term successfully sent!"); // Handle the response
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while sending the search term.");
    }
  };

  return (
    <div className="SongSearchPage">
      <h1>Search for a Song</h1>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display response message */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default SongSearchPage;
