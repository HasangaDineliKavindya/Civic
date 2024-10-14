import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './AuthorityAccounts.css';
import Navbar from './Navbar.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firebase Firestore related functions
import { db } from './utils/firebase.js';

export default function AuthorityAccounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredUsersCopy, setFilteredUsersCopy] = useState([]);
  const { authority } = useParams(); // Get 'authority' parameter from URL

  useEffect(() => {
    const fetchAuthorityAccounts = async () => {
      try {
        const q = query(
          collection(db, 'authority'),
          where('authority', '==', authority.toUpperCase())
        ); // Query to fetch accounts based on authority value
        const querySnapshot = await getDocs(q);
        const authorityUsers = [];
        querySnapshot.forEach((doc) => {
          // Extract data from each document
          const userData = doc.data();
          userData.id = doc.id;
          authorityUsers.push(userData);
        });
        setFilteredUsers(authorityUsers); // Set fetched users to state
        setFilteredUsersCopy(authorityUsers); // Set fetched users to state
      } catch (error) {
        console.error('Error fetching authority accounts:', error);
      }
    };

    fetchAuthorityAccounts(); // Fetch authority accounts on component mount
  }, [authority]); // Fetch accounts when 'authority' parameter changes

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') {
      // If the search query is empty, reset the filtered users to all users
      setFilteredUsersCopy(filteredUsers);
    } else {
      // Filter the users based on any property in the object
      const filtered = filteredUsers.filter((user) => {
        // Check if any property contains the search query
        return Object.values(user).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(query)
        );
      });
      setFilteredUsersCopy(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="authority-accounts-container">
        {/* <AdminSidebar /> */}
        <div className="authority-accounts">
          <div className="accounts-heading">
            <h2 style={{ color: 'black' }}>Admin Operations</h2>
            <h1 style={{ color: 'black' }}>Registered Authority Accounts</h1>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="short-search-bar"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
          <div className="accounts-content">
            <div className="blurred-box">
              {filteredUsersCopy.length === 0 ? (
                <p className="no-users-found">No matching users found!</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>NIC</th>
                      <th>Authority</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.id}</td>
                        <td>{user.passport}</td>
                        <td>{user.authority}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
