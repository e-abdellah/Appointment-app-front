import React from "react";
import BookingForm from "../../components/bookingForm/BookingForm";
import "./DoctorPage.css";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import { getById } from "../../api";
import { useParams } from "react-router-dom";
import DoctorCard from "../../components/doctors/DoctorCard";

const DoctorPage = () => {
  const { doctorId } = useParams();
  const parsedDoctorId = Number(doctorId);
  const apiUrl = `doctors/${parsedDoctorId}`;

  const { data: doctorData, error } = useSWR(apiUrl, getById);

  if (error) {
    return <div>Error loading doctor data</div>;
  }

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  const { id: doctorIdFromData, name, about, timeSlots } = doctorData;

  const handleSaveBooking = (values) => {
    // Do something with values
    console.log(values);
  };

  return (
    <div className="doctor-page">
      <header className="doctor-page__header">
        <h1 className="doctor-page__title">HealthCare</h1>
      </header>
      <main className="doctor-page__main">
        <section className="doctor-page__card">
          <AsyncData loading={!doctorData} error={error}>
            <DoctorCard doctor={doctorData} />
          </AsyncData>
        </section>
        <section className="doctor-page__about">
          <h2 className="doctor-page__about-title">About {name}</h2>
          <p className="doctor-page__about-text">{about}</p>
        </section>
        <section className="doctor-page__booking">
          <BookingForm
            onSaveBooking={handleSaveBooking}
            timeSlots={timeSlots}
          />
        </section>
      </main>
    </div>
  );
};

export default DoctorPage;
