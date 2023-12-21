import React from "react";
import { useAuth } from "../../contexts/Auth.context";
import Patient from "../../components/patients/Patient";
import Doctor from "../../components/doctors/Doctor";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getById, deleteById, put } from "../../api";
import Loader from "../../components/loader/Loader";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  // Debug log to check the user roles
  console.log("User roles:", user?.roles);

  const {
    data: userDetails,
    error,
    isLoading,
  } = useSWR(
    user && user.roles ? `/${user.roles[0].toLowerCase()}s/${user.id}` : null,
    getById
  );

  const { trigger: deletePatient } = useSWRMutation("patients", deleteById);
  const { trigger: updatePatient } = useSWRMutation("patients", put);
  const { trigger: deleteDoctor } = useSWRMutation("doctors", deleteById);
  const { trigger: updateDoctor } = useSWRMutation("doctors", put);

  if (isLoading) return <Loader />;
  if (error) return <div className="profile-error">Error: {error.message}</div>;


  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {user && user.roles && user.roles.length > 0 ? (
        user.roles.includes("PATIENT") ? (
          <div className="patient-profile-component">
            <Patient
              {...userDetails}
              onDelete={deletePatient}
              onSave={updatePatient}
            />
          </div>
        ) : user.roles.includes("DOCTOR") ? (
          <div className="doctor-profile-component">
            <Doctor
              {...userDetails}
              onDelete={deleteDoctor}
              onSave={updateDoctor}
            />
          </div>
        ) : (
          <div>No roles assigned to this user.</div>
        )
      ) : (
        <div>User or roles not available.</div>
      )}
    </div>
  );
};

export default Profile;
