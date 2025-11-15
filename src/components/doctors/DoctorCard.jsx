import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const getImageUrl = (photoPath) => {
    if (!photoPath) return "";
    if (photoPath.startsWith("http")) return photoPath;
    const baseUrl = import.meta.env.VITE_API_URL.replace("/api/", "").replace(
      "/api",
      ""
    );
    return `${baseUrl}${photoPath}`;
  };

  return (
    <div className="doctorCard">
      <Link to={`/doctors/${doctor.id}`}>
        <img
          src={getImageUrl(doctor.photo)}
          alt={doctor.name}
          className="doctorCard__photo"
        />
      </Link>
      <h2 className="doctorCard__name">{doctor.name}</h2>
      <div className="doctorCard__speciality-container">
        <div className="doctorCard__speciality">{doctor.speciality}</div>
      </div>
      <div className="doctorCard__hospital-button-container">
        <p className="doctorCard__hospital">{doctor.hospital}</p>
        <Link to={`/doctors/${doctor.id}`}>
          <button className="doctorCard__button" data-cy="doctor-card-button">
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
