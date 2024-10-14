import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <button className="menu-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={isSidebarOpen ? faArrowLeft : faArrowRight}
          color="blue"
        />
      </button>

      {isSidebarOpen && (
        <>
          <Link to="/imageComplaint" className="btn">
            report-complaint
          </Link>
          <Link to="/ComplaintStatus" className="btn">
            complaint-status
          </Link>
          <Link to="/complaintHistory" className="btn">
            complaint-history
          </Link>
          <Link to="/UserProfile" className="btn">
            my-profile
          </Link>
          <Link to="/Logout" className="btn">
            log out
          </Link>
        </>
      )}
    </div>
  );
}
