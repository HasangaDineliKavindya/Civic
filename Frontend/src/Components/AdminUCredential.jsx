import React, { useState } from 'react';
import './AdminUCredential.css';
import { auth, db } from './utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const AdminUCredential = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isFormVisible, setFormVisible] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleResetPassword = async () => {
    try {
      const q1 = query(
        collection(db, 'admin'),
        where('uid', '==', auth.currentUser.uid)
      );
      const querySnapshot1 = await getDocs(q1);

      if (querySnapshot1.empty) {
        setMessage('User not found in admin collection.');
        console.log('user not found');
        return;
      }

      // Get the authority from the first document in the query result
      const userAuthority = querySnapshot1.docs[0].data().authority;
      // Query Firestore to check if user is in the 'authority' collection and has the correct authority
      const q = query(
        collection(db, 'authority'),
        where('email', '==', email),
        where('authority', '==', `${userAuthority}`)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('User does not have authority to update password.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage('password reset email sent!');
    } catch (error) {
      setMessage(`Error updating user credentials: ${error.message}`);
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    navigate('/AdminOperations/urban'); // Navigate to AdminOperations/urban
  };

  return (
    <>
      {isFormVisible && (
        <div className="admin-credential-container">
          <div className="admin-credential-form">
            <button className="close-button" onClick={handleCloseForm}>
              X
            </button>
            <h2>Updating User Credentials</h2>
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* <div className="form-group">
                <label>Re-enter Password:</label>
                <input
                  type="password"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  required
                />
              </div> */}

              <button type="button" onClick={handleResetPassword}>
                Reset Password
              </button>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUCredential;
