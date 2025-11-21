import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/imgs/logo.png";
import { useAuth } from "../../contexts/Auth.context";
import SliderToggle from "../slider/SliderToggle";
import ProfileButton from "./ProfileButton";
import "./navBar.css";

const NavBar = () => {
  const { isAuthed, user, doctor } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

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

  useEffect(() => {
    // Set indicator position on active link
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        ".app-navbar-links__container-link.active"
      );
      if (activeLink) {
        updateIndicator(activeLink);
      }
    }
  }, []);

  const updateIndicator = (element) => {
    if (element && navRef.current) {
      const navContainer = navRef.current.querySelector(
        ".app-navbar-links__container"
      );
      const containerRect = navContainer.getBoundingClientRect();
      const linkRect = element.getBoundingClientRect();

      setIndicatorStyle({
        width: `${linkRect.width}px`,
        transform: `translateX(${linkRect.left - containerRect.left}px)`,
      });
    }
  };

  const handleMouseEnter = (e) => {
    updateIndicator(e.currentTarget);
  };

  const handleMouseLeave = () => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        ".app-navbar-links__container-link.active"
      );
      if (activeLink) {
        updateIndicator(activeLink);
      }
    }
  };

  const handleDropdownClick = (dropdownName) => (event) => {
    event.stopPropagation();
    setActiveDropdown((prevState) =>
      prevState === dropdownName ? "" : dropdownName
    );
  };

  return (
    <div className="app-navbar" ref={navRef}>
      <div className="app-navbar-links">
        <Link to="/" className="app-navbar-links__logo">
          <img src={logo} alt="logo" />
        </Link>
        <div className="app-navbar-links__container">
          <div
            className="app-navbar-links__indicator"
            style={indicatorStyle}
          ></div>
          <NavLink
            to="/"
            className="app-navbar-links__container-link"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="app-navbar-links__container-link"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </NavLink>
          <NavLink
            to="/doctors"
            className="app-navbar-links__container-link"
            data-cy="doctors-link"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Find a Doctor
          </NavLink>
          <NavLink
            to="/about"
            className="app-navbar-links__container-link"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
