import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById, put } from "../../api";
import Appointment from "../../components/appointments/Appointment";
import Error from "../../components/Error";
import AsyncData from "../../components/AsyncData";
import "./AppointmentList.css";
import { useAuth } from "../../contexts/Auth.context";

const AppointmentList = () => {
  const { user } = useAuth();
  const {
    data: appointments = [],
    error,
    isLoading,
  } = useSWR("appointments", getAll);
  const { trigger: deleteAppointment, error: deleteError } = useSWRMutation(
    "appointments",
    deleteById
  );
  const { trigger: updateAppointment } = useSWRMutation("appointments", put);

  if (isLoading) return <div>Loading...</div>;

// Filter the appointments based on the user's role and ID
const filteredAppointments = appointments.filter((appointment) => {
  if (user.roles.includes("patient")) {
    console.log("User roles and id:", user.roles, user.id);
    return appointment.patient.id === user.id;
  } else if (user.roles.includes("doctor")) {
    console.log("User roles and id:", user.roles, user.id);
    return appointment.doctor.id === user.id;
  } else {
    console.log("User roles and id:", user.roles, user.id);
    return true; // If the user has no specific role, show all appointments
  }
});


  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.id - b.id
  );

  return (
    <>
      <Error error={error} />
      <h1 className="appointment-list__title">Appointments</h1>
      <div className="appointment-list">
        {sortedAppointments.map((appointment) => (
          <div className="appointment-list__item" key={appointment.id}>
            <AsyncData loading={isLoading} error={error || deleteError}>
              <Appointment
                {...appointment}
                onDelete={deleteAppointment}
                onSave={updateAppointment}
              />
            </AsyncData>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppointmentList;
