import React from "react";
import DoctorCard from "./DoctorCard";
import { DOCTOR_DATA } from "../../api/mock_data";
import "./DoctorList.css";

const DoctorCards = () => {
  return (
    <div className="doctorCards">
      <h2 className="doctorCards__title">Some of our Great Doctors</h2>
      <div className="doctorCards__list">
        {DOCTOR_DATA.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorCards;
