import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Images/Logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-link-container">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Help">Help</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
