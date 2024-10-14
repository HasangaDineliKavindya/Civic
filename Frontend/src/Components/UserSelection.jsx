import React from 'react';
import './UserSelection.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';

const UserSelection = () => {
    const navigate = useNavigate();
  
    const handleOtherUserButtonClick = () => {
        // Navigate to the SelectionPage when "Other User" button is clicked
        navigate('/LogIn');
    };

    return (
        <div className="glass-container-user-selection">
            <div className="content-container-user-selection">
                <div className="content-user-selection">
                    <h1>Who are you?</h1>
                    <br />
                    <br />
                    <br />
                    {/* Use Link to redirect to the login page when the "General User" button is clicked */}
                    <Link to="/login" className="btn">
                        General User
                    </Link>
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* Link to the SelectionPage when "Other User" button is clicked */}
                    <Link to="/selection-page" className="btn">
                        Other User
                    </Link>
                    <Link to="/" className="close-icon">
                        {/* Update the close-icon to navigate back to the home page */}
                        <i className="fas fa-times"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserSelection;