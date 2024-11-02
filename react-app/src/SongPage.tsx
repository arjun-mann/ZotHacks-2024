import React, { useState, useEffect } from "react";
import "./PlaylistPage.css"; // Import the CSS file for styling

// Define the Playlist and Song types for TypeScript type checking
interface Song {
  id: string;
  name: string;
  artist: string;
}

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  recommendedSongs: Song[]; // Include recommended songs as part of the Playlist
}

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(""); // For the input field
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  // Effect to simulate fetching playlists when the component mounts
  useEffect(() => {
    const mockPlaylists: Playlist[] = [
      {
        id: "1",
        name: "Chill Vibes",
        images: [
          {
            url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849b12b784a6425a23ee7d2a3a",
          },
        ],
        recommendedSongs: [
          { id: "1", name: "Song 1", artist: "Artist A" },
          { id: "2", name: "Song 2", artist: "Artist B" },
          { id: "3", name: "Song 3", artist: "Artist C" },
        ],
      },
      {
        id: "2",
        name: "Workout Mix",
        images: [
          {
            url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84781355501085dec579477533",
          },
        ],
        recommendedSongs: [
          { id: "4", name: "Song 4", artist: "Artist D" },
          { id: "5", name: "Song 5", artist: "Artist E" },
          { id: "6", name: "Song 6", artist: "Artist F" },
        ],
      },
      {
        id: "3",
        name: "Top Hits",
        images: [
          {
            url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84157b16e675bd186a247f8ae5",
          },
        ],
        recommendedSongs: [
          { id: "7", name: "Song 7", artist: "Artist G" },
          { id: "8", name: "Song 8", artist: "Artist H" },
          { id: "9", name: "Song 9", artist: "Artist I" },
        ],
      },
    ];

    setTimeout(() => {
      setPlaylists(mockPlaylists);
      setLoading(false);
    }, 1000); // 1-second delay
  }, []);

  // Function to handle form submission (Mock implementation)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Simulate sending the data
    console.log("Mock sending data to backend:", inputValue);

    // Simulate a successful response
    setTimeout(() => {
      console.log("Mock success: Data received and processed!");
      alert("Search request sent successfully!");
    }, 500); // Simulate a delay
  };

  return (
    <div className="PlaylistsPage">
      <h1>Your Spotify Playlists</h1>

      {/* Search Form - Place it at the top for easy access */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          id="input-field"
          placeholder="Search for a song"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-bar"
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist)}
              className="playlist-item"
            >
              <img
                src={playlist.images[0]?.url}
                alt={playlist.name}
                width="50"
                height="50"
              />
              <span>{playlist.name}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Only show recommended songs if a playlist is selected */}
      {selectedPlaylist && (
        <div className="recommendations">
          <h2>Recommended Songs for "{selectedPlaylist.name}"</h2>
          <ul>
            {selectedPlaylist.recommendedSongs.map((song) => (
              <li key={song.id}>
                <p>
                  {song.name} by {song.artist}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlaylistsPage;
