import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import MainPage from './Pages/MainPage/MainPage';
import Home from './Pages/Home/Home';
import HelpRequests from './Pages/HelpRequests/HelpRequests';
import AboutUs from './Pages/AboutUs/AboutUs';
import Chat from './Component/Chat';
import GoogleMap from './Pages/Map/Googlemapapp'; // Import your GoogleMap component
import './helphub.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Set the login state to true
    setLoggedIn(true);
  };

  const handleReturnToLogin = () => {
    // Set the login state to false
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup onReturnToLogin={handleReturnToLogin} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/mainpage" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/mainpage" element={<MainPage />}>
            <Route index element={<Home />} />
            <Route path="help-requests" element={<HelpRequests />} />
            <Route path="about-us" element={<AboutUs />} />
            {/* Include the Chat component within the MainPage */}
            <Route path="chat" element={<Chat />} />
            {/* Include the GoogleMap component within the MainPage */}
            <Route path="google-map" element={<GoogleMap />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
