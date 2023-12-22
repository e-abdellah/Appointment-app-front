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
  const apiUrl = `/doctors/${doctorId}`;

  const { data: doctorData, error } = useSWR(apiUrl, getById);

  const handleSaveBooking = useCallback(
    async (values) => {
      if (!doctorData) return;

      const { date, time, condition, description, numberOfBeds } = values;
      try {
        // Combine date and time into a single Date object
        const dateTime = new Date(`${date}T${time}`);

        await save("appointments", {
          arg: {
            description: description,
            numberOfBeds: numberOfBeds,
            condition: condition,
            date: dateTime,
            patientId: user.id,
            doctorId: doctorId,
          },
        });

        alert(
          `Appointment saved successfully!\n\nDate: ${dateTime}\nDescription: ${description}`
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
    <>
      <header className="doctor-page__header">
        <h1 className="doctor-page__title">HealthCare</h1>
      </header>
      <div className="doctor-page">
        <main className="doctor-page__main">
          <div className="doctor-page__card_about">
            <section className="doctor-page__card">
              <AsyncData loading={!doctorData} error={error}>
                <DoctorCard doctor={doctorData} />
              </AsyncData>
            </section>
            <section className="doctor-page__about">
              <h2 className="doctor-page__about-title">About {name}</h2>
              <p className="doctor-page__about-text">{about}</p>
            </section>
          </div>
          <section className="doctor-page__booking">
            <BookingForm onSaveBooking={handleSaveBooking} />
          </section>
        </main>
      </div>
    </>
  );
};

export default DoctorPage;
