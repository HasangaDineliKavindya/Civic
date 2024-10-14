import React, { useState, useEffect } from 'react';
import './DeleteAccounts.css';
import Navbar from './Navbar.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import { useParams } from 'react-router-dom'; // Import useParams hook
import { db as database } from './utils/firebase'; // Assuming you have Firebase initialized and exported db
import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'; // Import Firebase Firestore related functions

export default function DeleteAccounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredUsersCopy, setFilteredUsersCopy] = useState([]);
  const { authority } = useParams(); // Get 'authority' parameter from URL

  // Fetch authority users from Firebase Firestore
  const fetchAuthorityUsers = async () => {
    try {
      const q = query(
        collection(database, 'authority'),
        where('authority', '==', authority.toUpperCase())
      ); // Query to fetch accounts based on authority value
      const authorityUsers = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const userData = doc.data();
        userData.id = doc.id;
        authorityUsers.push(userData);
      });
      setFilteredUsers(authorityUsers);
      setFilteredUsersCopy(authorityUsers);
    } catch (error) {
      console.error('Error fetching authority users:', error);
    }
  };
  useEffect(() => {
    fetchAuthorityUsers();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = filteredUsersCopy.filter((user) =>
        Object.values(user).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(query)
        )
      );
      setFilteredUsers(filtered);
    } else {
      // If search query is empty, use the copy of fetched data
      setFilteredUsers(filteredUsersCopy);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(database, 'authority', userId));

      // Delete the authority user from Firebase Firestore
      // await data.collection('authority').doc(userId).delete();
      // Refetch authority users to update the list
      // const usersSnapshot = await db.collection('authority').get();
      // const usersData = usersSnapshot.docs.map((doc) => doc.data());
      // setFilteredUsers(usersData);
      alert('deleted succesfully!');
      fetchAuthorityUsers();
    } catch (error) {
      alert('Error deleting user');
      console.error('Error deleting authority user:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="delete-accounts-container">
        {/* <AdminSidebar /> */}
        <div className="delete-accounts">
          <div className="delete-heading">
            <h1 style={{ color: 'black' }}>Delete Authority Accounts</h1>
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
          <div className="delete-content">
            {filteredUsers.length === 0 && (
              <p className="Doutlined-para">No matching users found!</p>
            )}
            {filteredUsers.length > 0 && (
              <div className="Dblurred-box">
                <table className="delete-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>ID</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.id}</td>
                        <td>
                          {/* Add delete action button */}
                          <button onClick={() => handleDelete(user.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
