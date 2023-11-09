import React from 'react';
import BookingForm from '../../patients/BookingForm';
import './DoctorPage.css';

const DoctorPage = ({ doctorData }) => {
  const { doctor, specialty, photo, about, timeSlots } = doctorData;

  return (
    <div className="doctor-page">
      <header className="doctor-page__header">
        <h1 className="doctor-page__title">Medicare</h1>
      </header>
      <main className="doctor-page__main">
        <section className="doctor-page__profile">
          <img src={photo} alt={doctor} className="doctor-page__photo" />
          <h2 className="doctor-page__name">{doctor}</h2>
          <p className="doctor-page__specialty">Specialization: {specialty}</p>
          {/* Add more doctor details here */}
        </section>
        <section className="doctor-page__about">
          <h2 className="doctor-page__about-title">About {doctor}</h2>
          <p className="doctor-page__about-text">{about}</p>
        </section>
        <section className="doctor-page__booking">
          <form className="doctor-page__booking-form">
            <BookingForm />
            {timeSlots.map((slot, index) => (
              <div key={index} className="doctor-page__time-slot">
                <p className="doctor-page__day">{slot.day}: {slot.time}</p>
              </div>
            ))}
          </form>
        </section>
      </main>
    </div>
  );
};

export default DoctorPage;










// import React from "react";
// import { useParams } from "react-router-dom";
// import "./doctorPage.css";
// import { DOCTOR_DATA } from "../../../api/mock_data";
// import Loader from "../../Loader";

// const DoctorPage = () => {
//   const { id } = useParams();
//   const doctorId = parseInt(id);
//   const doctorInfo = DOCTOR_DATA.find((doctor) => doctor.id === doctorId);

//   if (!doctorInfo) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   }

//   const renderAvailableTimeSlots = () => {
//     const days = Object.keys(doctorInfo.availableTime);

//     return (
//       <div>
//         <h3>Available Time Slots:</h3>
//         {days.map((day) => (
//           <p key={day}>
//             {day}: {doctorInfo.availableTime[day].startTime} -{" "}
//             {doctorInfo.availableTime[day].endTime}
//           </p>
//         ))}
//         <button>Book Appointment</button>
//       </div>
//     );
//   };

//   return (
//     <div className="doctor-page">
//       <div className="doctor-info">
//         <div className="doctor-card">
//           <img src={doctorInfo.photo} alt={doctorInfo.doctor} />
//           <h2>{doctorInfo.doctor}</h2>
//           <p>{doctorInfo.specialty}</p>
//           <p>{doctorInfo.hospital}</p>
//           <p>Number of Patients this week: {doctorInfo.numberOfPatients}</p>
//           <p>Rating: {doctorInfo.rating}</p>
//         </div>

//         <div className="available-time">{renderAvailableTimeSlots()}</div>
//       </div>

//       <div className="about-section">
//         <h3>About</h3>
//         <p>{doctorInfo.about}</p>
//       </div>

//       <div className="feedback-section">
//         <h3>Feedback</h3>
//         {/* Display feedback here */}
//       </div>

//       <div className="share-feedback">
//         <h3>Share Feedback or Suggestions</h3>
//         {/* Add a form for sharing feedback here */}
//       </div>
//     </div>
//   );
// };

// export default DoctorPage;
