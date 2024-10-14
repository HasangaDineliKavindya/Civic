import React from 'react';
import './Navbar.css';
import Logo from '../Images/Logo.png';

export default function Navbar() {
  return (
        <nav className='navbar'>
            <div className='navbar-logo-container'>
                <img src={Logo} alt='Logo'/>
            </div>
            <div className='navbar-link-container'>
                <a href="#home">Home</a>
                <a href="#about">Profile</a>
                <a href="#services">Help</a>
                <a href="#contact">About</a>
            </div>
        </nav>
  )
}
