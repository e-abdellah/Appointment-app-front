import React, { useState, useCallback, memo, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../contexts/Auth.context";
import "./Patient.css";

const PatientMemoized = memo(function Patient({
  id,
  name,
  email,
  street,
  number,
  postalCode,
  city,
  birthdate,
  onDelete,
  onSave,
}) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleSave = async () => {
    if (
      !editedPatient.name ||
      !editedPatient.email ||
      !editedPatient.street ||
      !editedPatient.number ||
      !editedPatient.postalCode ||
      !editedPatient.city ||
      !editedPatient.birthdate
    ) {
      alert("Please fill in all fields");
      return;
    }
    const updatedPatient = {
      id: editedPatient.id,
      name: editedPatient.name,
      email: editedPatient.email,
      street: editedPatient.street,
      number: editedPatient.number,
      postalCode: editedPatient.postalCode,
      city: editedPatient.city,
      birthdate: editedPatient.birthdate,
    };
    await onSave(updatedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient({
      id,
      name,
      email,
      street,
      number,
      postalCode,
      city,
      birthdate,
    });
  };

  useEffect(() => {
    setEditedPatient({
      id,
      name,
      email,
      street,
      number,
      postalCode,
      city,
      birthdate,
    });
  }, [id, name, email, street, number, postalCode, city, birthdate]);

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`patient ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <p className="patient-field">Patient Id: {editedPatient.id}</p>
          <label>
            Name:{" "}
            <input
              type="text"
              value={editedPatient.name}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:{" "}
            <input
              type="email"
              value={editedPatient.email}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, email: e.target.value })
              }
            />
          </label>
          <label>
            Street:{" "}
            <input
              type="text"
              value={editedPatient.street}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, street: e.target.value })
              }
            />
          </label>
          <label>
            Number:{" "}
            <input
              type="text"
              value={editedPatient.number}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, number: e.target.value })
              }
            />
          </label>
          <label>
            Postal Code:{" "}
            <input
              type="text"
              value={editedPatient.postalCode}
              onChange={(e) =>
                setEditedPatient({
                  ...editedPatient,
                  postalCode: e.target.value,
                })
              }
            />
          </label>
          <label>
            City:{" "}
            <input
              type="text"
              value={editedPatient.city}
              onChange={(e) =>
                setEditedPatient({ ...editedPatient, city: e.target.value })
              }
            />
          </label>
          <label>
            Birthdate:{" "}
            <input
              type="date"
              value={editedPatient.birthdate}
              max={today}
              onChange={(e) =>
                setEditedPatient({
                  ...editedPatient,
                  birthdate: e.target.value,
                })
              }
            />
          </label>
          <button onClick={handleSave}>
            <FiCheckCircle size={24} />
          </button>
          <button onClick={handleCancel}>
            <FiXCircle size={24} />
          </button>
        </>
      ) : (
        <>
          <p className="patient-field">Patient Id: {id}</p>
          <p className="patient-field">Name: {name}</p>
          <p className="patient-field">Email: {email}</p>
          <p className="patient-field">Street: {street}</p>
          <p className="patient-field">Number: {number}</p>
          <p className="patient-field">Postal Code: {postalCode}</p>
          <p className="patient-field">City: {city}</p>
          <p className="patient-field">Birthdate: {birthdate}</p>
          {(user && user.roles.includes("ADMIN")) || user.id === id ? (
            <>
              <button onClick={handleEdit}>
                <FiEdit2 size={24} />
              </button>
              <button onClick={handleDelete}>
                <FiTrash2 size={24} />
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
});

export default PatientMemoized;
