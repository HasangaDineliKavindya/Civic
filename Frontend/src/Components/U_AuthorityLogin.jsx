import React, { useState } from 'react';
import './LogIn.css';
import FBLogo from '../Images/fb.png';
import GoogleLogo from '../Images/google-sign.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks from react-router-dom
import { useAuth } from './AuthContext'; // Import useAuth hook from the authentication context
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from './utils/auth'; // Import authentication functions for email/password and Google


export default function Login() {
  const { userLoggedIn } = useAuth(); // Destructure userLoggedIn state from the authentication context
  const [email, setEmail] = useState(''); // Initialize state for email input
  const [password, setPassword] = useState(''); // Initialize state for password input
  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize state to track if the user is signed in
  const [errorMessage, setErrorMessage] = useState(''); // Initialize state to store error messages
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const onSubmit = async (e) => { // Define submit handler function
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (!isSignedIn) { // Check if the user is not already signed in
        setIsSignedIn(true); // Set isSignedIn state to true
        await doSignInWithEmailAndPassword(email, password); // Call authentication function for email/password sign-in
        navigate('/report-complaint'); // Navigate to the report complaint page after successful sign-in
      }
    } catch (error) { // Catch any errors that occur during sign-in
      setIsSignedIn(false); // Set isSignedIn state to false
      setErrorMessage(error.message); // Set error message state with the error message

      // Hide error message after 8 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  };

  const onGoogleSignIn = async (e) => { // Define Google sign-in handler function
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (!isSignedIn) { // Check if the user is not already signed in
        setIsSignedIn(true); // Set isSignedIn state to true
        await doSignInWithGoogle(); // Call authentication function for Google sign-in
        navigate('/report-complaint'); // Navigate to the report complaint page after successful sign-in
      }
    } catch (error) { // Catch any errors that occur during sign-in
      setIsSignedIn(false); // Set isSignedIn state to false
      setErrorMessage(error.message); // Set error message state with the error message

      // Hide error message after 8 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  };
  return (
    <div className="login-container"> {/* Container for the login form */}
      <form onSubmit={onSubmit}> {/* Form element with submit handler */}
        <div className="login-form"> {/* Form content */}
          <div className="close-button" onClick={() => navigate('/user-selection')}> {/* Close button */}
            <FontAwesomeIcon icon={faTimes} /> {/* Close icon */}
          </div>
          <h2> Sign In</h2> {/* Heading */}
          <div className="input-group"> {/* Email input group */}
            <label>Email:</label> {/* Email label */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> {/* Email input field */}
          </div>
          <div className="input-group"> {/* Password input group */}
            <label>Password:</label> {/* Password label */}
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> {/* Password input field */}
          </div>
          {/* Error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="login-button" type="submit"> {/* Log in button */}
            Log In
          </button>
          <div className="additional-options"> {/* Additional options */}
            <p>Forgot Password?</p> {/* Forgot password link */}
          </div>
          <div className="social-buttons"> {/* Social media sign-in buttons */}
            <button className="google-button" onClick={onGoogleSignIn}> {/* Google sign-in button */}
              <img src={GoogleLogo} alt="Google Logo" />
              Continue with Google
            </button>
            <button className="facebook-button"> {/* Facebook sign-in button */}
              <img src={FBLogo} alt="Facebook Logo" />
              Continue with Facebook
            </button>
          </div>
          <div className="additional-options"> {/* Additional options */}
            <Link to="/signup"> {/* Sign up link */}
              <p>Don’t have an account? Sign Up</p> {/* Sign up text */}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}