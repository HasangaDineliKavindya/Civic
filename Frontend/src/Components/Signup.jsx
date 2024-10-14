import React, { useState } from 'react';
import { auth, db } from './utils/firebase';
import './Signup.css';
import {
  query,
  collection,
  getDocs,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';

import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passport, setNicPassport] = useState('');
  const [contact, setContactNumber] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setNicPassport('');
    setContactNumber('');
    setRegion('');
    setEmail('');
    setPassword('');
    setReEnterPassword('');
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (!validateEmail) {
        alert('email is not valid!');
        return;
      }

      if (password !== reEnterPassword) {
        alert('password mismatch!');
        return;
      }

      let isUserExists = await checkUserExists(email);

      if (isUserExists) {
        alert('useralready exists with the given email!');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to database only if user is authenticated
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          passport,
          contact,
          region,
          email,
          uid: user.uid,
        });

        console.log('User signed up successfully:', user);

        alert('Account created successfully!'); // Show success message
        clearForm();
      } else {
        console.error('Error: User not authenticated');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error occurred while creating the account. Please try again.'); // Show error message
    }
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const checkUserExists = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if the query snapshot is not empty (user exists), false otherwise
    } catch (error) {
      console.error('Error checking user existence:', error.message);
      return false;
    }
  };
  /*const getdata = async () => {
    const data = {
      FirstName: firstName,
      LastName: lastName,
      NICPassport: nicPassport,
      ContactNumber: contactNumber,
      Region: region,
      Email: email,
      Password: password
    };

    try {
      const response = await fetch('https://civic-connect-92ec3-default-rtdb.firebaseio.com/UserData.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data' + response.status);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error.message);
      throw new Error('Error occurred while sending message. Please try again.');
    }
  };*/

  return (
    <div className="signup">
      <div className="form_container">
        <form onSubmit={handleSignup}>
          <h1 className="title_container">Sign Up</h1>
          <div className="userInfo">
            <label htmlFor="Fname">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="passport">NIC/Passport</label>
            <input
              type="text"
              placeholder="NIC/Passport"
              value={passport}
              onChange={(e) => setNicPassport(e.target.value)}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="Contact">Contact Number</label>
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="userinfo">
            <label htmlFor="Region">Region</label>
            <div className="region-container">
              <select
                className="form-control"
                id="regionSelect"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Region
                </option>
                <option value="sriLanka">Sri Lanka</option>
                <option value="foreign">Foreign</option>
              </select>
            </div>
          </div>
          <div className="userInfo">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="rpassword">Re-Enter Password</label>
            <input
              type="password"
              placeholder="Re-Enter Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />

            <div className="d-grid">
              <button className="btn btn-primary">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
