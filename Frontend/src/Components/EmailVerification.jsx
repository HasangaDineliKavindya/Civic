import React, { useState, useEffect } from 'react';
import './EmailVerification.css';
import VerifyEmailImage from '../Images/VerifyEmail.jpg';
import { auth, sendEmailVerification } from './firebase';

export default function EmailVerification() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  const sendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        console.log("Email verification sent successfully.");
      } else {
        console.error("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error sending email verification:", error.message);
    }
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  return (
    <div className="container">
      <div className="box"> <br/>
      <img src={VerifyEmailImage} alt="Verify Email" className="verification-image" /> <br/>
        <h1>Verify your email address</h1> <br/>
        <p>You've entered {userEmail} as the email address for your account.</p>
        <p>An email containing verification instructions was sent to {userEmail}.</p> <br/> <br/> <br/> <br/> <br/> <br/>
        <p className="lighter-text">
          Didn't receive the email?
          <a href="#" className="button">Resend email</a>
        </p>
      </div>
    </div>
  );
}
