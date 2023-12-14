import React from "react";
import "./Services.css";

const Services = () => {
  const servicesData = [
    {
      title: "Annual Health Checkup",
      description:
        "Ensure your well-being with our comprehensive annual health checkup. Our team of healthcare professionals will assess your overall health and provide personalized recommendations for a healthy lifestyle.",
    },
    {
      title: "Dental Cleaning",
      description:
        "Maintain good oral health with regular dental cleanings. Our experienced dental team will help you achieve a bright and healthy smile while addressing any concerns about your oral hygiene.",
    },
    {
      title: "Orthopedic Consultation",
      description:
        "Receive expert care for musculoskeletal issues with our orthopedic consultation service. Our orthopedic specialists will diagnose and treat conditions affecting your bones, joints, and muscles.",
    },
    {
      title: "Eye Exam",
      description:
        "Take care of your vision with routine eye exams. Our optometrists will assess your eye health, prescribe corrective lenses if needed, and provide guidance on maintaining optimal eye care.",
    },
    {
      title: "Allergy Consultation",
      description:
        "Find relief from allergies with our allergy consultation service. Our specialists will identify allergens, create personalized treatment plans, and help you manage allergy symptoms effectively.",
    },
    {
      title: "Gastroenterology Checkup",
      description:
        "Ensure digestive health with our gastroenterology checkup. Our gastroenterologists will assess your digestive system, perform necessary screenings, and provide guidance for maintaining a healthy gut.",
    },
    {
      title: "Cardiology Follow-up",
      description:
        "Stay on top of your heart health with cardiology follow-ups. Our cardiologists will monitor your cardiovascular condition, adjust treatment plans as needed, and provide guidance for a heart-healthy lifestyle.",
    },
    {
      title: "Pulmonology Evaluation",
      description:
        "Address respiratory concerns with a pulmonology evaluation. Our pulmonologists will assess lung function, diagnose respiratory conditions, and develop personalized treatment plans to improve your respiratory health.",
    },
    {
      title: "Neurology Consultation",
      description:
        "Receive expert care for neurological issues with our neurology consultation service. Our neurologists will diagnose and treat conditions affecting the nervous system, providing comprehensive and personalized care.",
    },
  ];

  return (
    <div className="services-section">
      <h2 className="services-section__title">Services</h2>
      {servicesData.map((service, index) => (
        <div key={index} className="service-card">
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__text">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
