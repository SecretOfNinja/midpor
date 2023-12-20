// Import necessary dependencies and styles
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Assuming you have this imported from Firebase
import { auth } from '../../Firebase/Firebase';
import './Login.css';

const Login = ({ onSignupClick, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error.message);

      
    }
  };

  return (
    <div className="login-container">
      <div className="welcome">
        Welcome to Helphub
      </div>
      <div className="login-box">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>
              Log In
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
