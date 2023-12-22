import React from "react";
import { useAuth } from "../../contexts/Auth.context";
import useSWR from "swr";
import Patient from "../../components/patients/Patient";
import Doctor from "../../components/doctors/Doctor";
import useSWRMutation from "swr/mutation";
import AsyncData from "../../components/AsyncData";
import Error from "../../components/Error";
import { getById, deleteById, put } from "../../api";
import Loader from "../../components/loader/Loader";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  
  console.log("User object:", user);
  console.log("User roles:", user?.roles);

  const { data: userDetails, error, isLoading } = useSWR(
    user && user.roles && user.roles[0]
      ? `/${user.roles[0].toLowerCase()}s/${user.id}`
      : null,
    getById
  );
  const { trigger: deletePatient } = useSWRMutation("patients", deleteById);
  const { trigger: updatePatient } = useSWRMutation("patients", put);
  const { trigger: deleteDoctor } = useSWRMutation("doctors", deleteById);
  const { trigger: updateDoctor } = useSWRMutation("doctors", put);

  if (isLoading || !user) return <Loader />;
  if (error) return <div className="profile-error">Error: {error.message}</div>;

  return (
    <>
      <Error error={error} />
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <AsyncData loading={isLoading} error={error}>
          {userDetails && userDetails.roles.includes("PATIENT") ? (
            <Patient
              className="profile-patient"
              {...userDetails}
              onDelete={deletePatient}
              onSave={updatePatient}
            />
          ) : userDetails && userDetails.roles.includes("DOCTOR") ? (
            <Doctor
              className="profile-doctor"
              {...userDetails}
              onDelete={deleteDoctor}
              onSave={updateDoctor}
            />
          ) : (
            <div>No roles assigned to this user.</div>
          )}
        </AsyncData>
      </div>
    </>
  );
};

export default Profile;