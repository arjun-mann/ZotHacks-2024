import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./LoginPage"; // Import the Login component
import SongSearchPage from "./SongSearch"; // Import the SongSearchPage component
import SongResPage from "./SongRes"; //Import the SongRes componenet

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Define routes for the app */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route for Login */}
          <Route path="/song-search" element={<SongSearchPage />} />{" "}
          <Route path="/song-res" element={<SongResPage />} />{" "}
          {/* Route for SongSearchPage */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
