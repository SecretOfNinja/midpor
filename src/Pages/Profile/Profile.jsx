import React, { useState, useEffect } from 'react';
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import './Profile.css';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [successDisplayName, setSuccessDisplayName] = useState('');
  const [successPassword, setSuccessPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cooldownMessageDisplayName, setCooldownMessageDisplayName] = useState('');
  const [cooldownMessagePassword, setCooldownMessagePassword] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (isProcessing) {
      setCooldownMessageDisplayName("Don't change display name too fast!");
      return;
    }

    try {
      setIsProcessing(true);

      const auth = getAuth();
      const user = auth.currentUser;

      // Update display name
      await updateProfile(user, {
        displayName: displayName,
      });

      // Fetch the latest user information
      const updatedUser = auth.currentUser;
      setDisplayName(updatedUser.displayName || '');
      setSuccessDisplayName('Display name updated successfully');

      setTimeout(() => {
        setSuccessDisplayName('');
        setIsProcessing(false);
      }, 10000);

      setTimeout(() => {
        setCooldownMessageDisplayName('');
      }, 10000);
    } catch (error) {
      setErrorMessage('Failed to update display name');

      setTimeout(() => {
        setErrorMessage('');
        setIsProcessing(false);
      }, 10000);

      setTimeout(() => {
        setCooldownMessageDisplayName('');
      }, 10000);
    }
  };

  const handleChangePassword = async () => {
    if (isProcessing) {
      setCooldownMessagePassword("Don't change password too fast!");
      return;
    }

    try {
      setIsProcessing(true);

      const auth = getAuth();
      const user = auth.currentUser;

      // Reauthenticate user before updating the password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccessPassword('Password changed successfully');

      setTimeout(() => {
        setSuccessPassword('');
        setIsProcessing(false);
      }, 10000);

      setTimeout(() => {
        setCooldownMessagePassword('');
      }, 10000);
    } catch (error) {
      setErrorMessage('Failed to change password');

      setTimeout(() => {
        setErrorMessage('');
        setIsProcessing(false);
      }, 10000);

      setTimeout(() => {
        setCooldownMessagePassword('');
      }, 10000);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-field">
        <label>Display Name:</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <button onClick={handleUpdateProfile}>Update Display Name</button>
        {successDisplayName && <p className="profile-success">{successDisplayName}</p>}
        {cooldownMessageDisplayName && <p className="profile-cooldown">{cooldownMessageDisplayName}</p>}
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <input type="email" value={email} disabled />
      </div>
      <div className="profile-field">
        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="profile-field">
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
        {successPassword && <p className="profile-success">{successPassword}</p>}
        {cooldownMessagePassword && <p className="profile-cooldown">{cooldownMessagePassword}</p>}
      </div>
      {errorMessage && <p className="profile-error">{errorMessage}</p>}
    </div>
  );
};

export default Profile;
