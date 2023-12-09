import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import FAQSection from "../../components/FaQ/FaQSection";
import Features from "../../components/features/Features";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-text-container">
          <h1>Welcome to HealthCare</h1>
          <p>
            Schedule your appointments with ease and keep track of your medical
            history.
          </p>
          <Link to="/doctors" className="hero-text-container_button">
            Request an Appointment
          </Link>
        </div>
        <div className="hero-image-container">
          <img
            src="../../../../assets/imgs/hero.jpg"
            alt="Hero Image"
            className="hero-image"
          />
        </div>
      </div>
      <Features />
      <FAQSection />
    </div>
  );
};

export default HomePage;
