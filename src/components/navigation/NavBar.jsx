import React, { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SliderToggle from "../../contexts/SliderToggle";
import { useAuth } from "../../contexts/Auth.context";

const NavBar = () => {
  const { isAuthed } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSignButtonClick = (event) => {
    // Stop event propagation to prevent immediate closing
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (role) => {
    setShowDropdown(false);

    console.log("Selected role:", role);

    if (role === "patient") {
      navigate("/patients/login");
    } else if (role === "doctor") {
      navigate("/doctors/login");
    }
  };

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

      <div className="app-navbar-container">
        <div className="app-navbar-sign-container">
          {isAuthed ? (
            <Link to="/logout">Logout </Link>
          ) : (
            <div className="app-navbar-sign">
              <button
                type="button"
                className="app-navbar-sign__button"
                onClick={(event) => handleSignButtonClick(event)}
              >
                Sign In
              </button>
              {showDropdown && (
                <div className="app-navbar-sign__dropdown" ref={dropdownRef}>
                  <button
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("patient")}
                  >
                    Patient
                  </button>
                  <button
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("doctor")}
                  >
                    Doctor
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="app-navbar-toggle">
          <SliderToggle className="dark-mode-toggle" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
