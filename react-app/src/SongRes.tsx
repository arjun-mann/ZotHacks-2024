import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SongRes.css";

// Define the Song type
interface Song {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

function SongRes() {
  const location = useLocation();
  const newSongs: Song[] = location.state?.songs || []; // Retrieve new songs from location state
  const [playlists, setPlaylists] = useState<Song[][]>(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  // Placeholder templates for song search
  const placeholderSongs: Song[] = [
    {
      id: "1",
      name: "Song Template 1",
      artist: "Artist Template",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Song Template 2",
      artist: "Artist Template",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Song Template 3",
      artist: "Artist Template",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "Song Template 4",
      artist: "Artist Template",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      name: "Song Template 5",
      artist: "Artist Template",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  // Add the new playlist if there are new songs
  useEffect(() => {
    if (newSongs.length > 0) {
      setPlaylists((prevPlaylists) => {
        const updatedPlaylists = [...prevPlaylists, newSongs];
        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
        return updatedPlaylists;
      });
    }
  }, [newSongs]);

  // Function to clear all playlists
  const clearPlaylists = () => {
    setPlaylists([]);
    localStorage.removeItem("playlists");
  };

  return (
    <div className="SongRes">
      <h1>Your Playlists</h1>

      {/* Display the Song Search Templates */}
      <div className="song-templates">
        <h2>Song Search Templates</h2>
        <div className="songs-grid">
          {placeholderSongs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-image-wrapper">
                <img
                  src={song.imageUrl}
                  alt={`${song.name} cover`}
                  className="song-image"
                />
              </div>
              <div className="song-details">
                <h3 className="song-name">{song.name}</h3>
                <p className="song-artist">by {song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display the Playlists */}
      {playlists.length > 0 ? (
        <div className="playlists-container">
          {playlists.map((playlist, index) => (
            <div key={index} className="playlist">
              <h2>Playlist {index + 1}</h2>
              <div className="songs-grid">
                {playlist.map((song) => (
                  <div key={song.id} className="song-card">
                    <div className="song-image-wrapper">
                      <img
                        src={song.imageUrl}
                        alt={`${song.name} cover`}
                        className="song-image"
                      />
                    </div>
                    <div className="song-details">
                      <h3 className="song-name">{song.name}</h3>
                      <p className="song-artist">by {song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No playlists have been created yet.</p>
      )}

      <button onClick={clearPlaylists} className="clear-button">
        Clear All Playlists
      </button>
    </div>
  );
}

export default SongRes;
