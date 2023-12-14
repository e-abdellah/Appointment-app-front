import React from "react";
import DoctorCard from "./DoctorCard";
import useSWR from "swr";
import { getAll } from "../../api";
import "./DoctorCards.css";
import AsyncData from "../AsyncData";

const DoctorCards = () => {
  const { data: doctors = [], isLoading, error } = useSWR("doctors", getAll);

  return (
    <div className="doctorCards">
      <h2 className="doctorCards__title">Some of our Great Doctors</h2>
      <AsyncData loading={isLoading} error={error}>
        <div className="doctorCards__list">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </AsyncData>
    </div>
  );
};

export default DoctorCards;
