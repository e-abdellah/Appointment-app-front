import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <Link to="/about" className="footer__link">
            About Us
          </Link>
          <Link to="/contact" className="footer__link">
            Contact
          </Link>
          <Link to="/privacy-policy" className="footer__link">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="footer__link">
            Terms of Service
          </Link>
        </div>
        <p className="footer__text">
          © 2023 Medicare developed by Abdellah El Halimi All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
