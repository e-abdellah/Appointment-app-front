import React from 'react';
import { PATIENT_DATA } from "../../api/mock_data";

const PatientDetail = ({ match }) => {
  const patientId = parseInt(match.params.id);
  const patient = PATIENT_DATA.find(p => p.id === patientId);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>{patient.street}, {patient.number}</p>
      <p>{patient.postalCode}, {patient.city}</p>
      <p>Condition: {patient.condition}</p>
    </div>
  );
};

export default PatientDetail;
