import React, { useState } from 'react';
import './LogIn.css';
import FBLogo from '../Images/fb.png';
import GoogleLogo from '../Images/google-sign.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks from react-router-dom
import { useAuth } from './AuthContext'; // Import useAuth hook from the authentication context
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from './utils/auth'; // Import authentication functions for email/password and Google
import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from './utils/firebase';

export default function Login() {
  const { userLoggedIn } = useAuth(); // Destructure userLoggedIn state from the authentication context
  const [email, setEmail] = useState(''); // Initialize state for email input
  const [password, setPassword] = useState(''); // Initialize state for password input
  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize state to track if the user is signed in
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state to store error messages
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userExists = await checkUserExists(email); // Check if the user exists in the 'authority' collection
      if (!userExists) {
        throw new Error(
          'User not authorized. Please contact the administrator.'
        );
      }

      if (!isSignedIn) {
        setIsSignedIn(true);
        await doSignInWithEmailAndPassword(email, password);
        navigate('/ImageComplaint');
      }
    } catch (error) {
      setIsSignedIn(false);
      setErrorMessage(error.message);

      // Hide error message after 8 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  };

  const checkUserExists = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if the query snapshot is not empty (user exists), false otherwise
    } catch (error) {
      console.error('Error checking user existence:', error.message);
      throw error;
    }
  };

  const onGoogleSignIn = async (e) => {
    // Define Google sign-in handler function
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (!isSignedIn) {
        // Check if the user is not already signed in
        setIsSignedIn(true); // Set isSignedIn state to true
        await doSignInWithGoogle(); // Call authentication function for Google sign-in
        navigate('/ImageComplaint'); // Navigate to the report complaint page after successful sign-in
      }
    } catch (error) {
      // Catch any errors that occur during sign-in
      setIsSignedIn(false); // Set isSignedIn state to false
      setErrorMessage(error.message); // Set error message state with the error message

      // Hide error message after 8 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  };

  return (
    <div className="login-container">
      {' '}
      {/* Container for the login form */}
      <form onSubmit={onSubmit}>
        {' '}
        {/* Form element with submit handler */}
        <div className="login-form">
          {' '}
          {/* Form content */}
          <div
            className="close-button"
            onClick={() => navigate('/user-selection')}
          >
            {' '}
            {/* Close button */}
            <FontAwesomeIcon icon={faTimes} /> {/* Close icon */}
          </div>
          <h2> Sign In</h2> {/* Heading */}
          <div className="input-group">
            {' '}
            {/* Email input group */}
            <label>Email:</label> {/* Email label */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{' '}
            {/* Email input field */}
          </div>
          <div className="input-group">
            {' '}
            {/* Password input group */}
            <label>Password:</label> {/* Password label */}
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{' '}
            {/* Password input field */}
          </div>
          {/* <div className="remember-me"> */} {/* Remember me checkbox */}
          {/* <input type="checkbox" id="rememberMe" /> */}
          {/* <label htmlFor="rememberMe">Remember me?</label>{' '} */}
          {/* Remember me label */}
          {/* </div> */}
          {/* Error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="login-button" type="submit">
            {' '}
            {/* Log in button */}
            Log In
          </button>
          <div className="additional-options">
            <p>or</p>
          </div>
          <div className="social-buttons">
            {' '}
            {/* Social media sign-in buttons */}
            <button className="google-button" onClick={onGoogleSignIn}>
              {' '}
              {/* Google sign-in button */}
              <img src={GoogleLogo} alt="Google Logo" />
              Continue with Google
            </button>
          </div>
          <div className="additional-options">
            {' '}
            <Link to="/signup">
              {' '}
              <p>Don’t have an account? Sign Up</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
