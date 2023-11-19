import React from 'react';
import './HomePage.css';
import FAQSection from '../FaQ/FaQSection';
import Features from '../features/Features';
import Footer from '../footer/Footer';

const HomePage = () => {
  return (
    <div className='home-page'>
      <div className='hero-section'>
        <div className='hero-text-container'>
          <h1>Welcome to HealthCare</h1>
          <p>
            Schedule your appointments with ease and keep track of your medical
            history.
          </p>
          <button className='btn btn-primary'>Request an Appointment</button>
        </div>
        <div className='hero-image-container'>
          <img
            src='../../../../assets/imgs/hero.jpg'
            alt='Hero Image'
            className='hero-image'
          />
        </div>
      </div>
      <Features />
      {/* <Services /> */}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;
