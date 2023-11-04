import { React, useState } from "react";
import { PATIENT_DATA } from "../../api/mock_data";
import Patient from "./Patient";

const PatientList = () => {
  const [patients, setPatients] = useState(PATIENT_DATA);

  const handleDeletePatient = (id) => {
    setPatients((patients) => patients.filter((p) => p.id !== id));
  };

  return (
    <div className="grid mt-20 mr-20 mb-20 ml-20"> 
      <h1>Patient List</h1>
      <div className="d-flex flex-column g-3">
        {patients
          .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
          .map((p) => (
            <div className="col" key={p.id}>
              <Patient {...p} onDelete={handleDeletePatient} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientList;
