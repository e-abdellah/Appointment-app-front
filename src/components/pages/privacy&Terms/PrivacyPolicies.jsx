import React from 'react';
import './PrivacyPolicies.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy">
      <h1 className="privacy__title">Privacy Policy</h1>
      <p className="privacy__text">
        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you through our app, Doctor Appointment App.
      </p>
      <h2 className="privacy__subtitle">Personal Information</h2>
      <p className="privacy__text">
        We may ask you for personal information, such as your name, email, address, contact details and medical history. We collect only the personal information relevant to providing you with a service, and use your information only to ensure the fulfilment of this service.
      </p>
      <h2 className="privacy__subtitle">Security</h2>
      <p className="privacy__text">
        We take security seriously, and do what we can within commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
      </p>
      <h2 className="privacy__subtitle">Cookies</h2>
      <p className="privacy__text">
        We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit so we can understand how you use our site and serve you content based on preferences you have specified.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
