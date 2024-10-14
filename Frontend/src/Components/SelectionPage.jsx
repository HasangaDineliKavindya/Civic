import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SelectionPage.css'; // Import your CSS file
import { FaArrowLeft } from 'react-icons/fa';

const SelectionPage = () => {
    const navigate = useNavigate();

    const handleAuthorityButtonClick = () => {
        // Navigate to the authority-login page when "Authority" button is clicked
        navigate('/AuthoritySelection');
    };

    const handleAdministratorButtonClick = () => {
        // Navigate to the administrator-login page when "Administrator" button is clicked

        navigate('/AdminSelection');

    };

    return (
        <div className="glass-container">
            <div className="content-container">
                <div className="content">
                    <Link to="/user-selection" className="back-icon">
                        <FaArrowLeft />
                    </Link>
                    <h1>Who are you?</h1>
                    <br />
                    <br />
                    <br />
                    {/* Add your custom buttons here */}
                    <button className="btn-Selection-page" onClick={handleAuthorityButtonClick}>
                        Authority
                    </button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button className="btn-Selection-page" onClick={handleAdministratorButtonClick}>
                        Administrator
                    </button>


                </div>
            </div>
        </div>
    );
};

export default SelectionPage;
