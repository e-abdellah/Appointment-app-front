import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SliderToggle from "../../contexts/SliderToggle";
import { useAuth } from "../../contexts/Auth.context";
import "./navBar.css";

const NavBar = () => {
  const { isAuthed, user, doctor } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const signInDropdownRef = useRef(null);
  const signUpDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (profileDropdownRef.current &&
          !profileDropdownRef.current.contains(event.target)) ||
        (signInDropdownRef.current &&
          !signInDropdownRef.current.contains(event.target)) ||
        (signUpDropdownRef.current &&
          !signUpDropdownRef.current.contains(event.target))
      ) {
        setShowProfileDropdown(false);
        setShowSignInDropdown(false);
        setShowSignUpDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownRef, signInDropdownRef, signUpDropdownRef]);

  const handleProfileClick = (event) => {
    event.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
    setShowSignInDropdown(false);
    setShowSignUpDropdown(false);
  };

  const handleSignInClick = (event) => {
    event.stopPropagation();
    setShowSignInDropdown(!showSignInDropdown);
    setShowProfileDropdown(false);
    setShowSignUpDropdown(false);
  };

  const handleSignUpClick = (event) => {
    event.stopPropagation();
    setShowSignUpDropdown(!showSignUpDropdown);
    setShowProfileDropdown(false);
    setShowSignInDropdown(false);
  };

  const handleOptionClick = (option) => {
    setShowSignInDropdown(false);
    setShowProfileDropdown(false);
    setShowSignUpDropdown(false);

    console.log("User Role:", user?.roles); // Add this line to check the user's role

    // console.log("Selected option:", option);

    // // Replace 'to' prop with the appropriate URLs
    // if (option === "profile") {
    //   // Link to the user's profile page
    // } else if (option === "appointments") {
    //   // Link to the appointments page
    // } else if (option === "patients" && doctor) {
    //   // Link to the doctor's patients page
    // } else if (option === "doctors") {
    //   // New Link to "Find a Doctor"
    //   // return <Link to="/doctors">Doctors</Link>;
    // } else if (option === "logout") {
    //   // Link to the logout page
    // } else if (option === "patient-login") {
    //   // Link to the patient login page
    // } else if (option === "doctor-login") {
    //   // Link to the doctor login page
    // } else if (option === "patient-signup") {
    //   // Link to the patient signup page
    // } else if (option === "doctor-signup") {
    //   // Link to the doctor signup page
    // }
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
          {!isAuthed ? (
            <div className="app-navbar-sign">
              <button
                type="button"
                className="app-navbar-sign__button"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
              {showSignInDropdown && (
                <div
                  className="app-navbar-sign__dropdown"
                  ref={signInDropdownRef}
                >
                  <Link
                    to="/patients/login"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("patient-login")}
                  >
                    Patient
                  </Link>
                  <Link
                    to="/doctors/login"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("doctor-login")}
                  >
                    Doctor
                  </Link>
                </div>
              )}
              {!showSignUpDropdown && (
                <button
                  type="button"
                  className="app-navbar-sign__button"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              )}
              {showSignUpDropdown && (
                <div
                  className="app-navbar-sign__dropdown"
                  ref={signUpDropdownRef}
                >
                  <Link
                    to="/patients/register"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("patient-signup")}
                  >
                    Patient
                  </Link>
                  <Link
                    to="/doctors/register"
                    className="app-navbar-sign__dropdown-button"
                    onClick={() => handleOptionClick("doctor-signup")}
                  >
                    Doctor
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="app-navbar-profile" onClick={handleProfileClick}>
              <div
                className="app-navbar-profile-photo"
                style={{ backgroundImage: `url(${user?.photo})` }}
              />

              {showProfileDropdown && (
                <div
                  className="app-navbar-profile__dropdown"
                  ref={profileDropdownRef}
                >
                  <Link
                    to="/my-profile"
                    className="app-navbar-profile__dropdown-button"
                    onClick={() => handleOptionClick("profile")}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="app-navbar-profile__dropdown-button"
                    onClick={() => handleOptionClick("appointments")}
                  >
                    Appointments
                  </Link>
                  {user &&
                    user.roles &&
                    (user.roles.includes("doctor") ||
                      user.roles.includes("admin")) && (
                      <Link
                        to="/my-patients"
                        className="app-navbar-profile__dropdown-button"
                        onClick={() => handleOptionClick("patients")}
                      >
                        Patients
                      </Link>
                    )}

                  {user && user.roles && user.roles.includes("admin") && (
                    <Link
                      to="/all-doctors"
                      className="app-navbar-profile__dropdown-button"
                      onClick={() => handleOptionClick("doctors")}
                    >
                      All Doctors
                    </Link>
                  )}

                  <Link
                    to="/logout"
                    className="app-navbar-profile__dropdown-button"
                    onClick={() => handleOptionClick("logout")}
                  >
                    Logout
                  </Link>
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
