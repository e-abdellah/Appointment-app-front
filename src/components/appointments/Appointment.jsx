import React, { useState, useCallback, memo, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./Appointment.css";

const AppointmentMemoized = memo(function Appointment({
  id,
  description,
  numberOfBeds,
  condition,
  date,
  patient,
  doctor,
  onDelete,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleSave = async () => {
    if (
      !editedAppointment.description ||
      !editedAppointment.numberOfBeds ||
      !editedAppointment.condition ||
      !editedAppointment.date ||
      !editedAppointment.patient.name ||
      !editedAppointment.doctor.name
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create a date object with the local timezone
    const localDate = new Date(
      `${editedAppointment.date}T${editedAppointment.time}`
    );

    // Convert the date object to a string in the ISO format (in UTC)
    const utcDate = localDate.toISOString();

    const updatedAppointment = {
      id: editedAppointment.id,
      description: editedAppointment.description,
      numberOfBeds: editedAppointment.numberOfBeds,
      condition: editedAppointment.condition,
      date: utcDate, // Use the UTC date-time string
      patientId: editedAppointment.patient.id,
      doctorId: editedAppointment.doctor.id,
    };

    await onSave(updatedAppointment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedAppointment({
      id,
      description,
      numberOfBeds,
      condition,
      date,
      patient,
      doctor,
    });
  };

  useEffect(() => {
    setEditedAppointment({
      id,
      description,
      numberOfBeds,
      condition,
      date: new Date(date).toISOString().split("T")[0], // Convert date to yyyy-mm-dd format
      time: new Date(date).toISOString().split("T")[1].substring(0, 5), // Extract time in hh:mm format
      patient,
      doctor,
    });
  }, [id, description, numberOfBeds, condition, date, patient, doctor]);

  return (
    <div className="appointment" data-cy={`appointment-${id}`}>
      {isEditing ? (
        <>
          {/* Render id as text, not editable */}
          <p data-cy="appointment-id">Appointment Id: {editedAppointment.id}</p>
          {/* Render input only for editable fields */}
          <label>
            Description:{" "}
            <input
              type="text"
              value={editedAppointment.description}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  description: e.target.value,
                })
              }
              data-cy="description-input"
            />
          </label>
          <label>
            Number of Beds:{" "}
            <input
              type="number"
              value={editedAppointment.numberOfBeds}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  numberOfBeds: e.target.value,
                })
              }
              data-cy="numberOfBeds-input"
            />
          </label>
          <label>
            Condition:{" "}
            <input
              type="text"
              value={editedAppointment.condition}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  condition: e.target.value,
                })
              }
              data-cy="condition-input"
            />
          </label>
          <label>
            Date:{" "}
            <input
              type="date"
              value={editedAppointment.date}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  date: e.target.value,
                })
              }
              data-cy="date-input"
            />
          </label>
          <label>
            Time:{" "}
            <input
              type="time"
              value={editedAppointment.time}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  time: e.target.value,
                })
              }
              data-cy="time-input"
            />
          </label>
          <label>
            Patient ID:{" "}
            <input
              type="text"
              value={editedAppointment.patient.id}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  patient: { ...editedAppointment.patient, id: e.target.value },
                })
              }
              data-cy="patient-id-input"
            />
          </label>
          <label>
            Patient Name:{" "}
            <input
              type="text"
              value={editedAppointment.patient.name}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  patient: {
                    ...editedAppointment.patient,
                    name: e.target.value,
                  },
                })
              }
              data-cy="patient-name-input"
            />
          </label>
          <label>
            Doctor ID:{" "}
            <input
              type="text"
              value={editedAppointment.doctor.id}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  doctor: { ...editedAppointment.doctor, id: e.target.value },
                })
              }
              data-cy="doctor-id-input"
            />
          </label>
          <label>
            Doctor Name:{" "}
            <input
              type="text"
              value={editedAppointment.doctor.name}
              onChange={(e) =>
                setEditedAppointment({
                  ...editedAppointment,
                  doctor: { ...editedAppointment.doctor, name: e.target.value },
                })
              }
              data-cy="doctor-name-input"
            />
          </label>
        </>
      ) : (
        <>
          <p data-cy="appointment-id">Appointment Id: {id}</p>
          <p data-cy="description">Description: {description}</p>
          <p data-cy="numberOfBeds">Number of Beds: {numberOfBeds}</p>
          <p data-cy="condition">Condition: {condition}</p>
          <p data-cy="date">
            Date:{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p data-cy="patient-id">Patient Id: {patient.id}</p>
          <p data-cy="patient-name">Patient Name: {patient.name}</p>
          <p data-cy="doctor-id">Doctor Id: {doctor.id}</p>
          <p data-cy="doctor-name">Doctor Name: {doctor.name}</p>
        </>
      )}
      <div className="appointment-actions" data-cy="appointment-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} data-cy="save-button">
              <FiCheckCircle size={24} />
            </button>
            <button onClick={handleCancel} data-cy="cancel-button">
              <FiXCircle size={24} />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} data-cy="edit-button">
              <FiEdit2 size={24} />
            </button>
            <button onClick={handleDelete} data-cy="delete-button">
              <FiTrash2 size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default AppointmentMemoized;
