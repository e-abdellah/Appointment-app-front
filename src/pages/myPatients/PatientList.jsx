import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById, put } from "../../api";
import Patient from "../../components/patients/Patient";
import Error from "../../components/Error";
import AsyncData from "../../components/AsyncData";
import { useAuth } from "../../contexts/Auth.context";
import "./PatientList.css";
import Loader from "../../components/loader/Loader";
import Unauthorized from "../../components/unauthorized/Unauthorized";

const PatientList = () => {
  const { user } = useAuth();
  const { data: patients = [], error, isLoading } = useSWR("patients", getAll);
  const { trigger: deletePatient, error: deleteError } = useSWRMutation(
    "patients",
    deleteById
  );
  const { trigger: updatePatient } = useSWRMutation("patients", put);

  console.log("User:", user); // Debug log for user
  console.log("Patients:", patients); // Debug log for patients
  console.log("Loading status:", isLoading); // Debug log for loading status
  console.log("Error:", error); // Debug log for error

  if (isLoading) return <Loader />;

  let filteredPatients = patients;

  if (user && user.roles.includes("patient") && !user.roles.includes("admin")) {
    return <Unauthorized />;
  }
  const sortedPatients = [...filteredPatients].sort((a, b) => a.id - b.id);

  return (
    <>
      <Error error={error} />
      <h1 className="patient-list__title">Patients</h1>
      <div className="patient-list">
        {sortedPatients.map((patient) => (
          <div className="patient-list__item" key={patient.id}>
            <AsyncData loading={isLoading} error={error || deleteError}>
              <Patient
                {...patient}
                onDelete={deletePatient}
                onSave={updatePatient}
              />
            </AsyncData>
          </div>
        ))}
      </div>
    </>
  );
};

export default PatientList;