import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./LoginPage.css";
import SongSearchPage from "./SongSearch"; // Import SongSearchPage component

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status
  const navigate = useNavigate(); // Create a navigate function

  // Function to handle login button click
  const handleLoginClick = () => {
    if (username.trim() !== "") {
      // If username is not empty, update login status and navigate
      setIsLoggedIn(true); // Set login status to true
      navigate("/song-search");
      console.log("User logged in with username:", username);
    } else {
      alert("Please enter a username to continue.");
    }
  };

  return (
    <div className="Login">
      {!isLoggedIn ? (
        <>
          <div>
            <img
              src="https://bmesatucirvine.weebly.com/uploads/8/7/2/2/87229218/headphone-anteater_orig.png"
              alt="Logo"
              style={{
                width: "400px",
                height: "auto",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            />
          </div>

          <h1 className="title">Zotify</h1>

          <div className="card">
            {/* Input for username */}
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
            />

            {/* Login button */}
            <button onClick={handleLoginClick} className="login-button">
              Click to login
            </button>

            <p>Get customized song recommendations based on your search!</p>
          </div>
        </>
      ) : (
        // Render SongSearchPage components when logged in
        <SongSearchPage />
      )}
    </div>
  );
};

export default Login;
