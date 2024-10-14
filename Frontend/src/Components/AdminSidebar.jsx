import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.css';

export default function AdminSidebar({ authority }) {
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
          <Link to={`/AdminOperations/${authority}`} className="btn">
            Admin Opearations{' '}
          </Link>
          <Link to="/AdminProfile" className="btn">
            My profile{' '}
          </Link>
          <Link to={`/AdminTable/${authority}`} className="btn">
            Dashboard{' '}
          </Link>
          <Link to="/Logout" className="btn">
            log out
          </Link>
        </>
      )}
    </div>
  );
}
