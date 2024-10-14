import React from 'react';
import './Logout.css';
import { auth } from './utils/firebase'; 

export default function Logout() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    window.history.back(); 
  };

  return (
    <div className="container">
      <div className="Lbox">
        <h1>LOG OUT</h1>
        <p>Are you sure you want to log out?</p>
        <div className="button-group">
          <button className="logout-button yes-button" onClick={handleLogout}>Yes</button>
          <button className="logout-button no-button" onClick={handleCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
