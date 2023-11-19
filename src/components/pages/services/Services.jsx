import React from "react";
import "./Services.css";
import Footer from "../footer/Footer";

const Services = () => {
  return (
    <div className="services-section">
      <h2 className="services-section__title">Services</h2>
      <div className="service-card">
        <h3 className="service-card__title">Cancer Care</h3>
        <p className="service-card__text">
          Our Cancer Care service provides comprehensive and personalized care
          for all types of cancer. Our team of experts uses the latest research
          to ensure you receive the best treatment possible.
        </p>
      </div>
      <div className="service-card">
        <h3 className="service-card__title">Labor & Delivery</h3>
        <p className="service-card__text">
          Our Labor & Delivery service offers a warm and welcoming environment
          for mothers. Our experienced staff is dedicated to making the birth of
          your child a memorable and joyful experience.
        </p>
      </div>
      <div className="service-card">
        <h3 className="service-card__title">Heart & Vascular</h3>
        <p className="service-card__text">
          Our Heart & Vascular service provides comprehensive care for patients
          with heart and vascular diseases. Our team of specialists is committed
          to improving your heart health.
        </p>
      </div>
      <div className="service-card">
        <h3 className="service-card__title">Mental Health</h3>
        <p className="service-card__text">
          Our Mental Health service offers a wide range of treatments for mental
          health disorders. Our team of professionals is dedicated to helping
          you improve your mental wellbeing.
        </p>
      </div>
      <div className="service-card">
        <h3 className="service-card__title">Neurology</h3>
        <p className="service-card__text">
          Our Neurology service provides advanced care for patients with
          neurological disorders. Our team of neurologists uses the latest
          technology to diagnose and treat a wide range of conditions.
        </p>
      </div>
      <div className="service-card">
        <h3 className="service-card__title">Orthopedics</h3>
        <p className="service-card__text">
          Our Orthopedics service offers comprehensive care for patients with
          musculoskeletal disorders. Our team of orthopedic surgeons is
          dedicated to helping you regain your mobility and live a pain-free
          life.
        </p>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Services;
