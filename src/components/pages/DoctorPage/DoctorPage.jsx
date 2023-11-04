import React from "react";
import "./DoctorPage.css";
import DoctorCard from "../../doctors/DoctorCard";

const DoctorPage = ({ doctor }) => {
  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctorPage">
      <div className="doctorPage__left">
        <h2>Available Time Slots:</h2>
        {doctor.timeSlots.map((slot, index) => (
          <div key={index} className="doctorPage__timeSlot">
            <p>{slot.day}:</p>
            <p>{slot.time}</p>
          </div>
        ))}
        <button type="button">Book Appointment</button>
        <h2>About</h2>
        <p>{doctor.about}</p>
        <h2>Feedback</h2>
        {/* Add feedback components here */}
        <button type="button">Share Feedback</button>
      </div>
      <div className="doctorPage__right">
        <DoctorCard doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorPage;
