import React from "react";
import "./TermsOfService.css";

const TermsAndConditions = () => {
  return (
    <div className="terms">
      <h1 className="terms__title">Terms and Conditions</h1>
      <p className="terms__text">
        Welcome to our Doctor Appointment App. If you continue to use this app,
        you are agreeing to comply with and be bound by the following terms and
        conditions of use, which together with our privacy policy govern our
        relationship with you in relation to this app. If you disagree with any
        part of these terms and conditions, please do not use our app.
      </p>
      <h2 className="terms__subtitle">Appointments</h2>
      <p className="terms__text">
        Appointments made through this app are subject to the availability of
        doctors and the confirmation of the clinic/hospital. The app is not
        responsible for the unavailability of the doctors or any rescheduling
        done at the end of the clinic/hospital.
      </p>
      <h2 className="terms__subtitle">Privacy Policy</h2>
      <p className="terms__text">
        Our privacy policy sets out how we use and protect any information that
        you give us when you use this app. We are committed to ensuring that
        your privacy is protected.
      </p>
      <h2 className="terms__subtitle">Changes to Terms</h2>
      <p className="terms__text">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. It is your responsibility to check our Terms
        periodically for changes.
      </p>
    </div>
  );
};

export default TermsAndConditions;
