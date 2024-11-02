import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./LoginPage"; // Import the Login component
import PlaylistPage from "./PlaylistPage"; // Import the PlaylistPage component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Define the routes for the app */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route */}
          <Route path="/playlists" element={<PlaylistPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
