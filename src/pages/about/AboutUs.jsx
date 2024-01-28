import React from "react";
import "./AboutUs.css";
import teamImage from "../../../assets/imgs/team.jpg";

const AboutUs = () => {
  return (
    <div className="about-us" data-cy="about-us">
      <div className="about-us__header" data-cy="about-us-header">
        <h2>About HealthCare</h2>
      </div>
      <div className="about-us__text" data-cy="about-us-text">
        <p>
          Launched in 2016, HealthCare is on a mission to revolutionize
          healthcare. Our goal is to make finding and booking an appointment
          with a qualified doctor as simple as possible.
        </p>
        <p>
          We believe in providing quality healthcare services that are
          accessible to everyone. Our dedicated team of professionals is
          committed to ensuring that our patients receive the best care
          possible.
        </p>
      </div>
      <div className="about-us__why-healthCare" data-cy="about-us-why">
        <h2>Why HealthCare</h2>
        <p>
          HealthCare provides a multitude of advantages such as easy access to
          healthcare services, a wide network of professionals, and
          cost-effective healthcare solutions. Our app simplifies the process of
          finding and booking appointments with qualified doctors, making
          healthcare more accessible and efficient.
        </p>
      </div>
      <div className="about-us__our-culture" data-cy="about-us-culture">
        <h2>Our Culture</h2>
        <p>
          Each patient and practitioner is important at doctoranytime.be. We are
          honoured and thrilled by their complete trust in us and willingness to
          do everything to keep it.
        </p>
        <p>
          Because your health is our priority. Our team is giving everything
          they have (and sometimes even more) to provide the best healthcare
          experience for everybody.
        </p>
        <p>
          Everyone at doctoranytime.be is a valuable addition to our young team.
          We love our fun and intimate working atmosphere in which each member
          can realize their full potential.
        </p>
      </div>
      <div className="about-us__expertise" data-cy="about-us-expertise">
        <h2>Expertise</h2>
        <p>
          We never stop improving our services. As our customer deserves the
          best medical experience, we see it as our duty to deliver innovative
          solutions.
        </p>
      </div>
      <div className="about-us__team" data-cy="about-us-team">
        <h2>Our Team</h2>
        <div className="about-us__team-image">
          <img src={teamImage} alt="Our Team" />
        </div>
        <p>
          Our team consists of experienced healthcare professionals who are
          passionate about improving patient care. We are dedicated to providing
          the best healthcare services to our patients.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
