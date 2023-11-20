import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import SliderToggle from "../SliderToggle";

const NavBar = () => {
  return (
    <div className="app-navbar">
      <div className="app-navbar-links">
        <div className="app-navbar-links__logo">
          <img src="../../../assets/imgs/logo.png" alt="logo" />
        </div>
        <div className="app-navbar-links__container">
          <NavLink to="/" className="app-navbar-links__container-link">
            Home
          </NavLink>
          <NavLink to="/services" className="app-navbar-links__container-link">
            Services
          </NavLink>
          <NavLink to="/doctors" className="app-navbar-links__container-link">
            Find a Doctor
          </NavLink>
          <NavLink to="/about" className="app-navbar-links__container-link">
            About Us
          </NavLink>
        </div>
      </div>
      <div className="app-navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign Up</button>
      </div>
      <div className="app-navbar-toggle">
        <SliderToggle className="dark-mode-toggle" />
      </div>
    </div>
  );
};

export default NavBar;
