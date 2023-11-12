import React from "react";
import "./DoctorCard.css";
import { IoArrowForward, IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctorCard">
      <Link to={`/doctors/${doctor.id}`}>
        <img
          src={doctor.photo}
          alt={doctor.doctor}
          className="doctorCard__photo"
        />
      </Link>

      <h2 className="doctorCard__name">{doctor.doctor}</h2>
      <div className="doctorCard__specialty-rating-container">
        <div className="doctorCard__specialty">{doctor.specialty}</div>
        <div className="doctorCard__rating">
          <IoStarSharp size={24} color="yellow" />
          <span>{` ${doctor.rating}`}</span>{" "}
          {/*TODO spatie tussen star, rating , nrofRatings */}
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
  );
};

export default DoctorCard;
