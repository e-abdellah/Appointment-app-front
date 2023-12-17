import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById, put } from "../../api";
import Appointment from "../../components/appointments/Appointment";
import Error from "../../components/Error";
import AsyncData from "../../components/AsyncData";
import "./AppointmentList.css";
import { useAuth } from "../../contexts/Auth.context";
import Loader from "../../components/loader/Loader";

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

  if (isLoading) return <Loader />;

  const sortedAppointments = appointments.sort((a, b) => a.id - b.id);

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
