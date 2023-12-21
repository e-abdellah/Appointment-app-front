import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";
import useSWR from "swr";
import { getById } from "../../api";
import Loader from "../../components/loader/Loader";

const ProfileButton = () => {
  const { user } = useAuth();

  const apiUrl =
    user && user.roles.includes("DOCTOR") ? `/doctors/${user.id}` : null;
  const { data: doctorDetails, error, isLoading } = useSWR(apiUrl, getById);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  console.log("User:", user);
  console.log("User roles:", user?.roles);
  console.log("Doctor:", doctorDetails);
  console.log("photo url: ", doctorDetails?.photo);
  if (error) {
    console.error("Error fetching doctor details:", error);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="app-navbar-profile" onClick={toggleDropdown}>
      <div
        className="app-navbar-profile-photo"
        style={{ backgroundImage: `url(${doctorDetails?.photo})` }}
      />
      {isDropdownVisible && (
        <div className="app-navbar-profile__dropdown">
          <Link
            to="/my-profile"
            className="app-navbar-profile__dropdown-button"
            onClick={toggleDropdown}
          >
            Profile
          </Link>
          <Link
            to="/my-appointments"
            className="app-navbar-profile__dropdown-button"
            onClick={toggleDropdown}
          >
            Appointments
          </Link>
          <Link
            to="/all-patients"
            className="app-navbar-profile__dropdown-button"
            onClick={toggleDropdown}
          >
            Patients
          </Link>
          <Link
            to="/all-doctors"
            className="app-navbar-profile__dropdown-button"
            onClick={toggleDropdown}
          >
            Doctors
          </Link>
          <Link
            to="/logout"
            className="app-navbar-profile__dropdown-button"
            onClick={toggleDropdown}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;