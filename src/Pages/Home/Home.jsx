import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/Firebase';
import Profile from "../Profile/Profile"
import "./home.css"
const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        // If user is not logged in, you can choose to navigate to another page or handle it differently
        // For example, navigate to a public landing page or display a message
        // navigate('/public-landing-page');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (!user) {
    // If user is not logged in, you can choose to render a different component or handle it differently
    // For example, display a message or navigate to a public landing page
    return (
      <div>
        <h3>Welcome to HelpHub, Guest!</h3>
        {/* Display a message or additional content for guests */}
      </div>
    );
  }

  return (
    <div>
      <h3>Welcome to HelpHub, {user.displayName || 'Guest'}!</h3>
      <Profile />
    </div>
  );
};

export default Home;
