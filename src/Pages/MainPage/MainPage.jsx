// MainPage.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MainPage.css'; // Import your updated CSS file
import logo from '../../Img/HelpHubLogo.png';

const MainPage = () => {
  return (
    <div>
      <header className="fixed-header">
        <nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Your Logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="help-requests">Help Requests</Link>
            </li>
            <li>
              <Link to="google-map">Google Map</Link>
            </li>
            <li>
              <Link to="about-us">About Us</Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default MainPage;
