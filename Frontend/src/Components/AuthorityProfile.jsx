import React, { useState, useEffect } from 'react';
import './AuthorityProfile.css';
import Navbar from './Navbar';
import AuthoritySidebar from './AuthoritySidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from './utils/firebase';

function AuthorityProfile() {
  const { authority } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    // AuthorityOfficeID: '',
    passport: '',
    email: '',
  });

  const fetchUserData = async () => {
    try {
      console.log('current user id', auth.currentUser.uid);
      const q = query(
        collection(db, 'authority'),
        where('uid', '==', auth.currentUser.uid) // Replace "userId" with the ID of the logged-in user
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
      } else {
        console.log('User document not found');
        alert('please log in again');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const deleteProfile = async () => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (!user) {
      console.error('No user is currently signed in.');
      return;
    }

    try {
      // Delete user from Firebase Authentication
      await user.delete();

      // Delete associated documents from Firestore
      const q = query(
        collection(db, 'authority'),
        where('uid', '==', auth.currentUser.uid)
      );

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // console.log('current user id', auth.currentUser.uid);
      // await setDoc(doc(db, 'users', auth.currentUser.uid), userData, {
      //   merge: true,
      // });
      const q = query(
        collection(db, 'authority'),
        where('uid', '==', auth.currentUser.uid)
      );

      // Step 2: Retrieve the document that matches the query
      const querySnapshot = await getDocs(q);

      // Step 3: Check if a document exists in the querySnapshot
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];

        console.log('not empty');
        // Step 5: Update the document with the desired data
        const documentRef = doc.ref;
        await updateDoc(documentRef, userData, {
          merge: true,
        });
        console.log(`Document with ID ${doc.id} updated successfully.`);
      }

      // }
      alert('updated successfully');
      fetchUserData();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleViewHistory = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <div className="authority-profile-container">
        <div>{/* <AuthoritySidebar route={''} /> */}</div>
        <div>
          <div className="user-profile">
            <h1 className="profile-title">Authority Profile</h1>
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
                {/* <label>
                  Authority Office ID
                  <input
                    type="text"
                    name="AuthorityOfficeID"
                    value={
                      isEditing
                        ? userData.AuthorityOfficeID
                        : userData.AuthorityOfficeID
                    }
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                  />
                </label> */}
                <label>
                  NIC/Passport
                  <input
                    type="text"
                    name="passport"
                    value={isEditing ? userData.passport : userData.passport}
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
                <button className="edit-button" onClick={handleSave}>
                  Edit Details
                </button>
                <button
                  className="complaint-history-button"
                  onClick={deleteProfile}
                >
                  Delete Profile
                </button>
                <button
                  className="complaint-history-button"
                  onClick={handleViewHistory}
                >
                  {`<- Go back`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorityProfile;
