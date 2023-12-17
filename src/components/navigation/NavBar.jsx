import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import SliderToggle from "../../contexts/SliderToggle";
import { useAuth } from "../../contexts/Auth.context";
import DropdownButton from "./DropdownButton";
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
    setShowProfileDropdown((prevState) => !prevState);
    setShowSignInDropdown(false);
    setShowSignUpDropdown(false);
  };

  const handleSignInClick = (event) => {
    event.stopPropagation();
    setShowSignInDropdown((prevState) => !prevState);
    setShowProfileDropdown(false);
    setShowSignUpDropdown(false);
  };

  const handleSignUpClick = (event) => {
    event.stopPropagation();
    setShowSignUpDropdown((prevState) => !prevState);
    setShowProfileDropdown(false);
    setShowSignInDropdown(false);
  };

  const handleOptionClick = (option) => {
    setShowSignInDropdown(false);
    setShowProfileDropdown(false);
    setShowSignUpDropdown(false);

    console.log("User Role:", user?.roles);
  };

  useEffect(() => {
    // Your logic to handleOptionClick after showProfileDropdown state is updated
    console.log("User Role:", user?.roles);
  }, [showProfileDropdown, user]);

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
              <DropdownButton
                showDropdown={showSignInDropdown}
                setShowDropdown={setShowSignInDropdown}
                dropdownRef={signInDropdownRef}
                buttonText="Sign In"
                dropdownOptions={[
                  {
                    key: "patient-signin",
                    text: "Patient",
                    path: "/patients/login",
                  },
                  {
                    key: "doctor-signin",
                    text: "Doctor",
                    path: "/doctors/login",
                  },
                ]}
                handleOptionClick={handleOptionClick}
              />
              <DropdownButton
                showDropdown={showSignUpDropdown}
                setShowDropdown={setShowSignUpDropdown}
                dropdownRef={signUpDropdownRef}
                buttonText="Sign Up"
                dropdownOptions={[
                  {
                    key: "patient-signup",
                    text: "Patient",
                    path: "/patients/register",
                  },
                  {
                    key: "doctor-signup",
                    text: "Doctor",
                    path: "/doctors/register",
                  },
                ]}
                handleOptionClick={handleOptionClick}
              />
            </div>
          ) : (
            <div className="app-navbar-profile" onClick={handleProfileClick}>
              <div
                className="app-navbar-profile-photo"
                style={{ backgroundImage: `url(${user?.photo})` }}
              />
              <DropdownButton
                showDropdown={showProfileDropdown}
                setShowDropdown={setShowProfileDropdown}
                dropdownRef={profileDropdownRef}
                buttonText="Profile"
                dropdownOptions={[
                  { key: "profile", text: "Profile", path: "/my-profile" },
                  {
                    key: "appointments",
                    text: "Appointments",
                    path: "/my-appointments",
                  },
                  { key: "patients", text: "Patients", path: "/all-patients" },
                  { key: "doctors", text: "Doctors", path: "/all-doctors" },
                  { key: "logout", text: "Logout", path: "/logout" },
                ]}
                handleOptionClick={handleOptionClick}
              />
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
