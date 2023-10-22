import React from 'react';
import { APPOINTMENT_DATA } from "../../api/mock_data";
import Appointment from "./Appointment";

const AppointmentList = () => {
  const appointments = APPOINTMENT_DATA;
  
  return (
    <div className="grid mt-3">
      <div className="d-flex flex-column g-3">
        {appointments.map((a) => (
          <div className="card bg-light border-dark mb-4" key={a.id}>
            <div className='card-body'>
              <Appointment {...a} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
