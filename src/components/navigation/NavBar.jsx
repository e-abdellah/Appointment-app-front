import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SliderToggle from "../slider/SliderToggle";
import logo from "../../../assets/imgs/logo.png";
import { useAuth } from "../../contexts/Auth.context";
import ProfileButton from "./ProfileButton";
import "./navBar.css";

const NavBar = () => {
  const { isAuthed, user, doctor } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownClick = (dropdownName) => (event) => {
    event.stopPropagation();
    setActiveDropdown((prevState) =>
      prevState === dropdownName ? "" : dropdownName
    );
  };

  return (
    <div className="app-navbar">
      <div className="app-navbar-links">
        <div className="app-navbar-links__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="app-navbar-links__container">
          <NavLink to="/" className="app-navbar-links__container-link">
            Home
          </NavLink>
          <NavLink to="/services" className="app-navbar-links__container-link">
            Services
          </NavLink>
          <NavLink
            to="/doctors"
            className="app-navbar-links__container-link"
            data-cy="doctors-link"
          >
            Find a Doctor
          </NavLink>
          <NavLink to="/about" className="app-navbar-links__container-link">
            About Us
          </NavLink>
        </div>
      </div>
      <div className="app-navbar-container">
        <div className="app-navbar-sign-container">
          {!isAuthed ? (
            <div className="app-navbar-sign">
              <button
                type="button"
                className="app-navbar-sign__button"
                onClick={handleDropdownClick("signIn")}
              >
                Sign In
              </button>
              {activeDropdown === "signIn" && (
                <div className="app-navbar-sign__dropdown" ref={dropdownRef}>
                  <Link
                    to="/patients/login"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => setActiveDropdown("")}
                    data-cy="patient-login-btn"
                  >
                    Patient
                  </Link>
                  <Link
                    to="/doctors/login"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => setActiveDropdown("")}
                    data-cy="doctor-login-btn"
                  >
                    Doctor
                  </Link>
                </div>
              )}
              <button
                type="button"
                className="app-navbar-sign__button"
                onClick={handleDropdownClick("signUp")}
              >
                Sign Up
              </button>
              {activeDropdown === "signUp" && (
                <div className="app-navbar-sign__dropdown" ref={dropdownRef}>
                  <Link
                    to="/patients/register"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => setActiveDropdown("")}
                  >
                    Patient
                  </Link>
                  <Link
                    to="/doctors/register"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => setActiveDropdown("")}
                  >
                    Doctor
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <ProfileButton
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          )}
        </div>
        <SliderToggle />
      </div>
    </div>
  );
};

export default NavBar;
