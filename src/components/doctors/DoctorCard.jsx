import React from "react";
import useSWR from "swr";
import "./DoctorCard.css";
import { IoArrowForward, IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AsyncData from "../AsyncData";

const DoctorCard = ({ doctorId, doctor }) => {
  // If doctorId is provided, fetch the doctor data
  const { data, error } = useSWR(doctorId ? `doctors/${doctorId}` : null);

  // If doctor object is provided, use it directly
  const currentDoctor = doctor || data;

  return (
    <AsyncData loading={!currentDoctor && !error} error={error}>
      {currentDoctor && (
        <div className="doctorCard">
          <Link to={`/doctors/${currentDoctor.id}`}>
            <img
              src={currentDoctor.photo}
              alt={currentDoctor.name}
              className="doctorCard__photo"
            />
          </Link>
          <h2 className="doctorCard__name">{currentDoctor.name}</h2>
          <div className="doctorCard__speciality-rating-container">
            <div className="doctorCard__speciality">
              {currentDoctor.speciality}
            </div>
            <div className="doctorCard__rating">
              <IoStarSharp size={24} color="yellow" />
              <span>{` ${currentDoctor.rating}`}</span>
              <span>{` (${currentDoctor.numberOfRatings})`}</span>
            </div>
          </div>
          <div className="doctorCard__hospital-button-container">
            <p className="doctorCard__hospital">{currentDoctor.hospital}</p>
            <Link to={`/doctors/${currentDoctor.id}`}>
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




// import React from "react";
// import "./DoctorCard.css";
// import { IoArrowForward, IoStarSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";

// const DoctorCard = ({ doctor }) => {
//   return (
//     <div className="doctorCard">
//       <Link to={`/doctors/${doctor.id}`}>
//         <img
//           src={doctor.photo}
//           alt={doctor.doctor}
//           className="doctorCard__photo"
//         />
//       </Link>

//       <h2 className="doctorCard__name">{doctor.doctor}</h2>
//       <div className="doctorCard__speciality-rating-container">
//         <div className="doctorCard__speciality">{doctor.speciality}</div>
//         <div className="doctorCard__rating">
//           <IoStarSharp size={24} color="yellow" />
//           <span>{` ${doctor.rating}`}</span>{" "}
//           {/*TODO spatie tussen star, rating , nrofRatings */}
//           <span>{` (${doctor.numberOfRatings})`}</span>
//         </div>
//       </div>
//       <div className="doctorCard__hospital-button-container">
//         <p className="doctorCard__hospital">{doctor.hospital}</p>
//         <Link to={`/doctors/${doctor.id}`}>
//           <button className="doctorCard__button">
//             <div className="icon-container">
//               <IoArrowForward size={24} />
//             </div>
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;




