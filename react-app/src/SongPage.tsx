import React, { useState } from "react";
import "./SongSearch.css"; // Import the CSS file for styling

// Define the Song type
interface Song {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
}

function SongSearchPage() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]); // State to store the recommended songs
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // State for response message

  // Function to handle search form submission
  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    fetch("http://localhost:5000/search?song=" + searchTerm)
      .then((res) => res.json())
      .then((res) => {
        console.log("finished", res);
      });
    try {
      // Send the search term to the backend as a plain string
      // const response = await fetch(
      //   "http://localhost:5000/search?song=" + searchTerm
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to send search term to the backend");
      // }

      // Simulate receiving data from the backend
      // Replace this with real data when the API is available
      // const mockData: Song[] = [
      //   {
      //     id: "1",
      //     name: "Song One",
      //     artist: "Artist A",
      //     imageUrl:
      //       "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg", // Placeholder image URL
      //   },
      //   {
      //     id: "2",
      //     name: "Song Two",
      //     artist: "Artist B",
      //     imageUrl:
      //       "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg", // Placeholder image URL
      //   },
      //   {
      //     id: "3",
      //     name: "Song Three",
      //     artist: "Artist C",
      //     imageUrl:
      //       "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg", // Placeholder image URL
      //   },
      //   {
      //     id: "4",
      //     name: "Song Four",
      //     artist: "Artist D",
      //     imageUrl:
      //       "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg", // Placeholder image URL
      //   },
      //   {
      //     id: "5",
      //     name: "Song Five",
      //     artist: "Artist E",
      //     imageUrl:
      //       "https://media.newyorker.com/photos/66d0e1a0dbfcd564cf6b198b/master/w_2560%2Cc_limit/Brickner-Wood-Drake.jpg", // Placeholder image URL
      //   },
      // ];
      console.log(response);
      // setRecommendedSongs(mockData);
      // setResponseMessage("Recommendations received successfully!");
    } catch (error) {
      // console.error("Error:", error);
      // setResponseMessage("An error occurred while sending the search term.");
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

      {/* Response Message */}
      {responseMessage && <p>{responseMessage}</p>}

      {/* Song Recommendations */}
      <div className="recommended-songs">
        {recommendedSongs.map((song) => (
          <div key={song.id} className="song-card">
            <img
              src={song.imageUrl}
              alt={`${song.name} cover`}
              className="song-image"
            />
            <div className="song-info">
              <h3 className="song-name">{song.name}</h3>
              <p className="song-artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongSearchPage;
