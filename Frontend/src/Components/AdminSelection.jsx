import React from 'react';
import { Link } from 'react-router-dom';
import './AuthoritySelection.css';
import Capture from '../Images/Capture.PNG';
import urban from '../Images/urban.PNG';
import RoadA from '../Images/RoadA.PNG';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

const AdminSelection = () => {
  return (
    <div className="account-card">
      <Link to="/selection-page" className="back-link">
        {' '}
        {/* Add the Link to navigate back */}
        <FaArrowLeft className="back-icon" />
      </Link>
      <h2 className="header">Select an Account</h2>

      {/* First Box */}
      <Link to="/AdminLogin/urban" className="box orange">
        <div className="account-option">
          <div className="avatar">
            <img src={urban} alt="urban" />
          </div>
          <div className="account-details">
            <p className="account-name">Urban Council</p>
          </div>
        </div>
      </Link>

      {/* Second Box */}
      <Link to="/AdminLogin/water" className="box blue">
        <div className="account-option">
          <div className="avatar">
            <img src={Capture} alt="Capture" />
          </div>
          <div className="account-details">
            <p className="account-name">Water Board</p>
          </div>
        </div>
      </Link>

      {/* Third Box */}
      <Link to="/AdminLogin/road" className="box three">
        <div className="account-option">
          <div className="avatar">
            <img src={RoadA} alt="Road" />
          </div>
          <div className="account-details">
            <p className="account-name">Road Authority</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminSelection;
