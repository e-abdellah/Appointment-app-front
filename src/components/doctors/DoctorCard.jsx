import React from "react";
import "./DoctorCard.css";
import { IoArrowForward, IoStarSharp } from "react-icons/io5";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctorCard">
      <img
        src={doctor.photo}
        alt={doctor.doctor}
        className="doctorCard__photo"
      />
      <h2 className="doctorCard__name">{doctor.doctor}</h2>
      <div className="doctorCard__specialty-rating-container"> 
        <div className="doctorCard__specialty">{doctor.specialty}</div>
        <div className="doctorCard__rating">
          <IoStarSharp size={24} color="yellow" />
          <span>{` ${doctor.rating}`}</span>
          <span>{` (${doctor.numberOfRatings})`}</span>
        </div>
      </div> 
      <div className="doctorCard__hospital-button-container">
        <p className="doctorCard__hospital">{doctor.hospital}</p>
        <button className="doctorCard__button">
          <div className="icon-container">
            <IoArrowForward size={24} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
