import React, { useState } from 'react';
import './CreateAuthAcc.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './utils/firebase.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

function CreateAuthAcc() {
  const auth = getAuth(); // Get the Auth instance
  const { authority } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClose = () => {
    // window.location.href = '/';
    navigate('/AdminOperations/urban'); // Navigate to AdminOperations/urban page
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passport, setPassport] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    const handleResetFields = () => {
      setFirstName('');
      setLastName('');
      setPassport('');
      setContact('');
      setEmail('');
      setPassword('');
      setRePassword('');
    };

    try {
      // Create user authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user details to Firestore
      await addDoc(collection(db, 'authority'), {
        firstName,
        lastName,
        passport,
        contact,
        email,
        uid: userCredential.user.uid, // Add the user's UID
        authority: authority.toUpperCase(),
      });

      // Show success alert
      alert('Account created successfully');
      handleResetFields();
    } catch (error) {
      // Show error alert
      alert('Error creating account: ' + error.message);
    }
  };

  return (
    <div className="create-auth-acc">
      <div className="form-container">
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit}>
          <h1 className="form-title">Create Authority Account</h1>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passport">NIC/Passport</label>
            <input
              type="text"
              placeholder="Enter your NIC or passport number"
              className="form-control"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              placeholder="Enter your contact number"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="form-control"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAuthAcc;
