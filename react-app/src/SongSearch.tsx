import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./SongSearch.css"; // Import the CSS file for styling

// Define the Song type
interface Song {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

function SongSearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search input
  const [songs, setSongs] = useState<Song[]>([]); // State to store the recommended songs
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]); // State to stre the selected songs
  const [loading, setLoading] = useState<boolean>(false); // State to indicate loading

  const generateSongRecs = () => {};

  // Function to handle search form submission
  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the search is initiated

    try {
      // Send the search term to the backend as a plain string
      const response = await fetch(
        "http://localhost:5001/search?song=" + searchTerm
      );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch songs from the backend");
      // }

      // Simulate receiving data from the backend
      const data = await response.json();
      console.log(data);
      setSongs(
        data.tracks.items.map(({ data }) => ({
          id: data.id,
          artist: data.artists.items
            .map(({ profile }) => profile.name)
            .join(", "),
          name: data.name,
          imageUrl: data.albumOfTrack.coverArt.sources?.[0].url,
        }))
      );
      // Set the songs received from the backend
      // setSongs(data.slice(0, 5)); // Limit to 5 songs
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching songs.");
    } finally {
      setLoading(false); // Set loading to false when the search is complete
    }
  };

  const clearSelectedSongs = () => {
    setSelectedSongs([]);
  };

  // Placeholder templates for songs
  const placeholderSongs: Song[] = [
    {
      id: "1",
      name: "Song Name",
      artist: "Artist",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "2",
      name: "Song Name",
      artist: "Artist",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "3",
      name: "Song Name",
      artist: "Artist",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "4",
      name: "Song Name",
      artist: "Artist",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "5",
      name: "Song Name",
      artist: "Artist",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    },
  ];

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
      {/* Display Loading Message */}
      {loading && <p>Loading...</p>}
      {/* Display Song Templates or Search Results */}
      <div className="recommended-songs">
        {(songs.length > 0 ? songs : placeholderSongs).map((song, index) => (
          <div key={song.id || index} className="song-card">
            <img
              src={song.imageUrl}
              alt={`${song.name} cover`}
              className="song-image"
            />
            <div className="song-info">
              <h3 className="song-name">{song.name}</h3>
              <p>{song.artist}</p>

              <button
                className="add-button"
                onClick={async () => {
                  await fetch("http://localhost:5001/seed", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                      id: song.id,
                    }),
                  });
                }}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <button onClick={generateSongRecs}>Generate Song Recommendations</button> */}

      <Link to="/song-res">
        <button onClick={generateSongRecs}>
          Generate Song Recommendations
        </button>
      </Link>

      {/* clear selected songs */}
      <button onClick={clearSelectedSongs}>Clear Selected Songs</button>
    </div>
  );
}

export default SongSearchPage;
