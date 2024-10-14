import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { auth, db } from './utils/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(true);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    region: '',
    nicPassport: '',
    email: '',
  });

  const deleteProfile = async () => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (!user) {
      console.error('No user is currently signed in.');
      alert('please login to continue...');
      navigate('/login');
      return;
    }

    try {
      // Delete user from Firebase Authentication
      await user.delete();

      // Delete associated documents from Firestore
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        try {
          // Delete each document
          await deleteDoc(doc.ref);
          // User deleted successfully
          alert('User deleted successfully.');
          navigate('/');
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      });
    } catch (error) {
      // An error occurred while deleting the user
      console.error('Error deleting user:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      console.log('current user id', auth.currentUser.uid);
      const q = query(
        collection(db, 'users'),
        where('uid', '==', auth.currentUser.uid) // Replace "userId" with the ID of the logged-in user
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
      } else {
        console.log('User document not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log('current user id', auth.currentUser.uid);
      await setDoc(doc(db, 'users', auth.currentUser.uid), userData, {
        merge: true,
      });

      alert('updated successfully');
      fetchUserData();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="user-profile-container">
        <div>
          <Sidebar />
        </div>
        <div className="user-profile">
          <h1 className="profile-title">User Profile</h1>
          <div className="profile-details">
            <div className="details">
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={isEditing ? userData.firstName : userData.firstName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={isEditing ? userData.lastName : userData.lastName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Contact Number
                <input
                  type="text"
                  name="contactNumber"
                  value={
                    isEditing ? userData.contactNumber : userData.contactNumber
                  }
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Region
                <select
                  name="region"
                  value={isEditing ? userData.region : userData.region}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Foreign">Foreign</option>
                </select>
              </label>
              <label>
                NIC/Passport
                <input
                  type="text"
                  name="nicPassport"
                  value={
                    isEditing ? userData.nicPassport : userData.nicPassport
                  }
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email
                <input
                  disabled
                  type="text"
                  name="email"
                  value={isEditing ? userData.email : userData.email}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="edit-save">
              {isEditing ? (
                <>
                  <button className="save-button" onClick={handleSave}>
                    Update
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={handleEdit}>
                  Edit Details
                </button>
              )}
              <button
                className="complaint-history-button"
                onClick={deleteProfile}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
