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

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    console.log("HELLO W WEO HERE");
    fetch("http://localhost:5001/recommendations")
      .then((res) => res.json())
      .then((res) => {
        console.log("HERE IS OUR RES", res);
        // setSongs(res.tracks.items.map(({ data }) => ({
        //     id: data.id,
        //     artist: data.artists.items
        //       .map(({ profile }) => profile.name)
        //       .join(", "),
        //     name: data.name,
        //     imageUrl: data.albumOfTrack.coverArt.sources?.[0].url,
        //   })))

        setSongs(
          res.tracks.map(({ artists, name, album }) => ({
            artist: artists.map(({ name }) => name).join(", "),
            name: name,
            imageUrl: album.images[1].url,
          }))
        );
      });
  }, []);

  //   const handleRecsSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     setLoading(true); // Set loading to true when the search is initiated

  //     try {
  //       // Send the search term to the backend as a plain string
  //       const response = await fetch(
  //         "http://localhost:5001/recommendations" + searchTerm
  //       );

  //       // if (!response.ok) {
  //       //   throw new Error("Failed to fetch songs from the backend");
  //       // }

  //       // Simulate receiving data from the backend
  //       const data = await response.json();
  //       console.log(data);
  //       setSongs(
  //         data.tracks.items.map(({ data }) => ({
  //           id: data.id,
  //           artist: data.artists.items
  //             .map(({ profile }) => profile.name)
  //             .join(", "),
  //           name: data.name,
  //           imageUrl: data.albumOfTrack.coverArt.sources?.[0].url,
  //         }))
  //       );
  //       // Set the songs received from the backend
  //       // setSongs(data.slice(0, 5)); // Limit to 5 songs
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while fetching songs.");
  //     } finally {
  //       setLoading(false); // Set loading to false when the search is complete
  //     }
  //   };

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
          {songs.map((song) => (
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
