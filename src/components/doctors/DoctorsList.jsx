import React from 'react';
import { DOCTOR_DATA } from "../../api/mock_data";

const DoctorList = () => {
  const doctors = DOCTOR_DATA;
  
  return (
    <div className="grid mt-3 ml-20">
      <div className="d-flex flex-column g-3">
        {doctors
          .sort((a, b) =>
            a.doctor.toUpperCase().localeCompare(b.doctor.toUpperCase())
          )
          .map((d) => (
            <div className="card bg-light border-dark mb-4" key={d.id}>
              <div className='card-body'>
                <h5 className='card-title'>{d.doctor}</h5>
                <p>Specialty: {d.specialty}</p>
                <p>Number of patients: {d.numberOfPatients}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
