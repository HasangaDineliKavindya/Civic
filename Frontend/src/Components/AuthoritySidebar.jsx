import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import MenuIcon from '../Images/menu.png';

export default function AuthoritySidebar({ route }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} // Corrected template literals
      style={{ gridColumn: '1' }}
    >
      <button
        className={`menu-btn ${isSidebarOpen ? '' : 'closed'}`} // Corrected template literals
        onClick={toggleSidebar}
      >
        <img src={MenuIcon} alt="Menu Icon" />
      </button>

      {isSidebarOpen && (
        <>
          <Link to={route} className="btn">
            Dashboard
          </Link>
          <Link to={`/AuthorityProfile`} className="btn">
            My Profile
          </Link>
          <Link to="/logout" className="btn">
            logout
          </Link>
        </>
      )}
    </div>
  );
}
