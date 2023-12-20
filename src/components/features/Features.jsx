import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="features-section">
      <div className="features-section__title-container">
        <h2 className="features-section__title">Features</h2>
      </div>
      <div className="feature-cards-container">
        <div className="feature-card">
          <img
            src="/assets/imgs/schedule.png"
            alt="Schedule Appointments"
            className="feature-card__image"
          />
          <h3 className="feature-card__title">Schedule Appointments</h3>
          <p className="feature-card__text">
            Easily schedule your appointments with our user-friendly interface.
          </p>
        </div>
        <div className="feature-card">
          <img
            src="/assets/imgs/history.png"
            alt="Medical History"
            className="feature-card__image"
          />
          <h3 className="feature-card__title">Medical History</h3>
          <p className="feature-card__text">
            Keep track of your medical history and access it from anywhere.
          </p>
        </div>
        <div className="feature-card">
          <img
            src="/assets/imgs/doctors.png"
            alt="Find Doctors"
            className="feature-card__image"
          />
          <h3 className="feature-card__title">Find Doctors</h3>
          <p className="feature-card__text">
            Find doctors in your area and book appointments online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
