import React from "react";
import BookingForm from "../../patients/BookingForm";
import "./DoctorPage.css";
import { DOCTOR_DATA } from "../../../api/mock_data";
import { useParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import DoctorCard from "../../doctors/DoctorCard";

const DoctorPage = () => {
  const { id } = useParams();
  const doctorId = Number(id);
  const doctorData = DOCTOR_DATA.find((doctor) => doctor.id === doctorId);

  if (!doctorData) {
    return <div>Doctor not found</div>;
  }

  const {
    doctor,
    specialty,
    photo,
    about,
    timeSlots,
    rating,
    numberOfRatings,
  } = doctorData;

  return (
    <div className="doctor-page">
      <header className="doctor-page__header">
        <h1 className="doctor-page__title">HealthCare</h1>
      </header>
      <main className="doctor-page__main">
  <section className="doctor-page__card">
    <DoctorCard doctor={doctorData} />
  </section>
  <section className="doctor-page__about">
    <h2 className="doctor-page__about-title">About {doctor}</h2>
    <p className="doctor-page__about-text">{about}</p>
  </section>
  <section className="doctor-page__booking">
    <BookingForm />
  </section>
  <section className="doctor-page__time-slots">
    <h2 className='doctor-page__time-slots__title'>Available time slots</h2>
    {timeSlots.map((slot, index) => (
      <div key={index} className="doctor-page__time-slot">
        <p className="doctor-page__day">
          {slot.day}: {slot.time}
        </p>
      </div>
    ))}
  </section>
</main>

    </div>
  );
};

export default DoctorPage;
