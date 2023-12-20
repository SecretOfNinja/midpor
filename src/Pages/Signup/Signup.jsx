import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { Link, useNavigate } from 'react-router-dom';

import './Signup.css';

const Signup = ({ onReturnToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordStrong = () => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUppercase && hasSymbol;
  };

  const handleSignup = async () => {
    try {
      setError('');

      if (!isEmailValid()) {
        setError('Invalid email address');
        return;
      }

      if (!isPasswordStrong()) {
        setError('Password must include uppercase letters and symbols');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: displayName });

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDisplayName('');

      console.log('User signed up successfully');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please choose a different email.');
      } else {
        console.error('Signup error:', error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      {/* Use a Link component for navigation */}
      <Link to="/login">Return to Login</Link>
    </div>
  );
};

export default Signup;
