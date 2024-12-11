import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { VscThreeBars } from "react-icons/vsc";
import { CiSearch, CiHeart, CiUser, FaBars } from "react-icons/ci";
import "./Navbar.css"; // Assuming CSS is in a separate file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      {/* First Row */}
      <div className="navbar">
        {/* Left Section */}
        <div className="navbar-logo">
          <img src="/path-to-logo.png" alt="Logo" className="logo-image" />
        </div>

        {/* Middle Section */}
        <div className="navbar-title">LOGO</div>

        {/* Right Section */}
        <div className="navbar-icons">
          <CiSearch className="icon icon-bg" />
          <CiHeart className="icon icon-bg" />
          <FiShoppingBag className="icon icon-bg" />
          <CiUser className="icon icon-bg" />
          <VscThreeBars
            className="icon icon-bg menu-icon"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Second Row (Links) */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="#shop">Shop</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        <a href="#contact">Contact Us</a>
      </div>
    </div>
  );
};

export default Navbar;
