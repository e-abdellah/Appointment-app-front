import React from "react";
import useSWR from "swr";
import "./DoctorCard.css";
import { IoArrowForward, IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AsyncData from "../AsyncData";

const DoctorCard = ({ doctor }) => {
  return (
    <AsyncData loading={!doctor} error={null}>
      {doctor && (
        <div className="doctorCard">
          <Link to={`/doctors/${doctor.id}`}>
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="doctorCard__photo"
            />
          </Link>
          <h2 className="doctorCard__name">{doctor.name}</h2>
          <div className="doctorCard__speciality-rating-container">
            <div className="doctorCard__speciality">
              {doctor.speciality}
            </div>
            <div className="doctorCard__rating">
              <IoStarSharp size={24} color="yellow" />
              <span>{` ${doctor.rating}`}</span>
              <span>{` (${doctor.numberOfRatings})`}</span>
            </div>
          </div>
          <div className="doctorCard__hospital-button-container">
            <p className="doctorCard__hospital">{doctor.hospital}</p>
            <Link to={`/doctors/${doctor.id}`}>
              <button className="doctorCard__button">
                <div className="icon-container">
                  <IoArrowForward size={24} />
                </div>
              </button>
            </Link>
          </div>
        </div>
      )}
    </AsyncData>
  );
};

export default DoctorCard;
