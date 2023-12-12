import React, { useState, useCallback, memo, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEdit2 } from "react-icons/fi";
import { getById } from "../../api/index";
import { useParams } from "react-router-dom";
import "./PatientProfile.css";

const PatientProfile = ({ id }) => {
  const { patientId } = useParams();
  console.log("Patient ID:", patientId); 
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the patient's information using the patientId from the URL
    fetch(`/api/patients/${patientId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setPatientData(data);
    })
    .catch((error) => {
      console.error("Error fetching patient data:", error);
      // Handle the error as needed
    });
      console.log("Patient ID:", patientId); 
    }, [patientId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!patient.name || !patient.id) {
      alert("Please fill in all fields");
      return;
    }
    const updatedPatient = {
      ...patient,
    };
    await getById(updatedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true); 
      const fetchedPatient = await getById(id);
      setPatient(fetchedPatient);
      setIsLoading(false); 
    };
    fetchPatient();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`patient ${isEditing ? "editing" : ""}`}>
      {patientData ? (
        isEditing ? (
          <>
            {/* Render id as text, not editable */}
            <p className="patient-field">Patient Id: {patientData.id}</p>
            {/* Render input only for editable fields */}
            <label>
              Name:{" "}
              <input
                type="text"
                value={patientData.name}
                onChange={(e) =>
                  setPatientData({ ...patientData, name: e.target.value })
                }
              />
            </label>
            <label>
              Email: <input type="email" value={patientData.email} disabled />
            </label>
            <label>
              Street:{" "}
              <input
                type="text"
                value={patientData.street}
                onChange={(e) =>
                  setPatientData({ ...patientData, street: e.target.value })
                }
              />
            </label>
            <label>
              Number:{" "}
              <input
                type="text"
                value={patientData.number}
                onChange={(e) =>
                  setPatientData({ ...patientData, number: e.target.value })
                }
              />
            </label>
            <label>
              Postal Code:{" "}
              <input
                type="text"
                value={patientData.postalCode}
                onChange={(e) =>
                  setPatientData({ ...patientData, postalCode: e.target.value })
                }
              />
            </label>
            <label>
              City:{" "}
              <input
                type="text"
                value={patientData.city}
                onChange={(e) =>
                  setPatientData({ ...patientData, city: e.target.value })
                }
              />
            </label>
            <label>
              Birthdate:{" "}
              <input
                type="date"
                value={patientData.birthdate}
                onChange={(e) =>
                  setPatientData({ ...patientData, birthdate: e.target.value })
                }
              />
            </label>
          </>
        ) : (
          <>
            <p className="patient-field">Patient Id: {patientData.id}</p>
            <p className="patient-field">Name: {patientData.name}</p>
            <p className="patient-field">Email: {patientData.email}</p>
            <p className="patient-field">Street: {patientData.street}</p>
            <p className="patient-field">Number: {patientData.number}</p>
            <p className="patient-field">Postal Code: {patientData.postalCode}</p>
            <p className="patient-field">City: {patientData.city}</p>
            <p className="patient-field">Birthdate: {patientData.birthdate}</p>
          </>
        )
      ) : (
        <p>Loading patient data...</p>
      )}
      <div className="patient-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>
              <FiCheckCircle size={24} />
            </button>
            <button onClick={handleCancel}>
              <FiXCircle size={24} />
            </button>
          </>
        ) : (
          <button onClick={handleEdit}>
            <FiEdit2 size={24} />
          </button>
        )}
      </div>
    </div>
  );  
};

export default PatientProfile;
