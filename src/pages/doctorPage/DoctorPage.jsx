import React, { useCallback } from "react";
import BookingForm from "../../components/bookingForm/BookingForm";
import "./DoctorPage.css";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import { getById, save } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import DoctorCard from "../../components/doctors/DoctorCard";
import { useAuth } from "../../contexts/Auth.context";

const DoctorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { doctorId } = useParams();
  const apiUrl = `doctors/${doctorId}`;

  const { data: doctorData, error } = useSWR(apiUrl, getById);

  const handleSaveBooking = useCallback(
    async (values) => {
      if (!doctorData) return;

      const { date, condition, description, numberOfBeds } = values;
      try {
        await save("appointments", {
          arg: {
            description: description,
            numberOfBeds: numberOfBeds,
            condition: condition,
            date: date,
            patientId: user.id,
            doctorId: doctorId,
          },
        });

        alert(
          `Appointment saved successfully!\n\nDate: ${date}\nDescription: ${description}`
        );

        navigate("/my-appointments");
      } catch (error) {
        console.error("Error saving appointment:", error);
      }
    },
    [user, doctorId, doctorData]
  );

  if (error) {
    return <div>Error loading doctor data</div>;
  }

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  const { name, about } = doctorData;

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
          <BookingForm onSaveBooking={handleSaveBooking} />
        </section>
      </main>
    </div>
  );
};

export default DoctorPage;
