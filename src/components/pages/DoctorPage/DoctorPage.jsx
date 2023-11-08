import React from "react";
import { useParams } from "react-router-dom";
import "./doctorPage.css";
import { DOCTOR_DATA } from "../../../api/mock_data";

const DoctorPage = () => {
  const { id } = useParams();
  const doctorId = parseInt(id);
  const doctorInfo = DOCTOR_DATA.find((doctor) => doctor.id === doctorId);

  // If doctorInfo is undefined, render a loading message
  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  // Function to generate the list of available time slots
  const renderAvailableTimeSlots = () => {
    const days = Object.keys(doctorInfo.availableTime);

    return (
      <div>
        <h3>Available Time Slots:</h3>
        {days.map((day) => (
          <p key={day}>
            {day}: {doctorInfo.availableTime[day].startTime} -{" "}
            {doctorInfo.availableTime[day].endTime}
          </p>
        ))}
        <button>Book Appointment</button>
      </div>
    );
  };
  
  return (
    <div className="doctor-page">
      <div className="doctor-info">
        <div className="doctor-card">
          <img src={doctorInfo.photo} alt={doctorInfo.doctor} />
          <h2>{doctorInfo.doctor}</h2>
          <p>{doctorInfo.specialty}</p>
          <p>{doctorInfo.hospital}</p>
          <p>Number of Patients this week: {doctorInfo.numberOfPatients}</p>
          <p>Rating: {doctorInfo.rating}</p>
        </div>

        <div className="available-time">{renderAvailableTimeSlots()}</div>
      </div>

      <div className="about-section">
        <h3>About</h3>
        <p>{doctorInfo.about}</p>
      </div>

      <div className="feedback-section">
        <h3>Feedback</h3>
        {/* Display feedback here */}
      </div>

      <div className="share-feedback">
        <h3>Share Feedback or Suggestions</h3>
        {/* Add a form for sharing feedback here */}
      </div>
    </div>
  );
};

export default DoctorPage;
