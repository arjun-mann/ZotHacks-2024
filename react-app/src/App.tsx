import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./LoginPage"; // Import the Login component
import SongSearchPage from "./SongSearch"; // Import the SongSearchPage component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Define routes for the app */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default route for Login */}
          <Route path="/song-search" element={<SongSearchPage />} />{" "}
          {/* Route for SongSearchPage */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
