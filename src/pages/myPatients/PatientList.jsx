import React from "react";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById, put } from "../../api";
import Patient from "../../components/patients/Patient";
import Error from "../../components/Error";
import AsyncData from "../../components/AsyncData";
import { useAuth } from "../../contexts/Auth.context";
import "./PatientList.css";
import Loader from "../../components/loader/Loader";

const PatientList = () => {
  const { user } = useAuth();
  const {
    data: patients = [],
    error,
    isLoading,
  } = useSWR("patients", getAll);
  const { trigger: deletePatient, error: deleteError } = useSWRMutation(
    "patients",
    deleteById
  );
  const { trigger: updatePatient } = useSWRMutation( 
    "patients",
    put
  );

  if (isLoading) return <Loader />;

  let filteredPatients = patients;
  if (user && user.roles.includes("patient")) {
    filteredPatients = patients.filter((patient) => patient.id === user.id);
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
              <Patient {...patient} onDelete={deletePatient} onSave={updatePatient} /> 
            </AsyncData>
          </div>
        ))}
      </div>
    </>
  );
};

export default PatientList;
