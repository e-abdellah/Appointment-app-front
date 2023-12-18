import React, { useState, useCallback, memo, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../contexts/Auth.context";
import "./Doctor.css";

const DoctorMemoized = memo(function Doctor({
  id,
  name,
  email,
  speciality,
  numberOfPatients,
  photo,
  hospital,
  numberOfRatings,
  rating,
  about,
  timeSlots,
  onDelete,
  onSave,
}) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState(null);

  const handleEdit = () => {
    console.log("Editing doctor:", id);
    setIsEditing(true);
  };

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleSave = async () => {
    console.log("Saving doctor:", editedDoctor);

    if (
      !editedDoctor.name ||
      !editedDoctor.email ||
      !editedDoctor.speciality ||
      !editedDoctor.numberOfPatients ||
      !editedDoctor.photo ||
      !editedDoctor.hospital ||
      !editedDoctor.numberOfRatings ||
      !editedDoctor.rating ||
      !editedDoctor.about ||
      !editedDoctor.timeSlots
    ) {
      alert("Please fill in all fields");
      return;
    }
    const updatedDoctor = {
      id: editedDoctor.id,
      name: editedDoctor.name,
      email: editedDoctor.email,
      speciality: editedDoctor.speciality,
      numberOfPatients: editedDoctor.numberOfPatients,
      photo: editedDoctor.photo,
      hospital: editedDoctor.hospital,
      numberOfRatings: editedDoctor.numberOfRatings,
      rating: editedDoctor.rating,
      about: editedDoctor.about,
      timeSlots: editedDoctor.timeSlots,
    };
    await onSave(updatedDoctor);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDoctor({
      id,
      name,
      email,
      speciality,
      numberOfPatients,
      photo,
      hospital,
      numberOfRatings,
      rating,
      about,
      timeSlots,
    });
  };

  useEffect(() => {
    setEditedDoctor({
      id,
      name,
      email,
      speciality,
      numberOfPatients,
      photo,
      hospital,
      numberOfRatings,
      rating,
      about,
      timeSlots,
    });
  }, [
    id,
    name,
    email,
    speciality,
    numberOfPatients,
    photo,
    hospital,
    numberOfRatings,
    rating,
    about,
    timeSlots,
  ]);

  return (
    <div className="doctor">
      {isEditing ? (
        <>
          <p>Doctor Id: {editedDoctor.id}</p>
          <label>
            Name:{" "}
            <input
              type="text"
              value={editedDoctor.name}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:{" "}
            <input
              type="email"
              value={editedDoctor.email}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, email: e.target.value })
              }
            />
          </label>
          <label>
            Speciality:{" "}
            <input
              type="text"
              value={editedDoctor.speciality}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, speciality: e.target.value })
              }
            />
          </label>
          <label>
            Number of Patients:{" "}
            <input
              type="number"
              value={editedDoctor.numberOfPatients}
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                  numberOfPatients: e.target.value,
                })
              }
            />
          </label>
          <label>
            Photo:{" "}
            <input
              type="text"
              value={editedDoctor.photo}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, photo: e.target.value })
              }
            />
          </label>
          <label>
            Hospital:{" "}
            <input
              type="text"
              value={editedDoctor.hospital}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, hospital: e.target.value })
              }
            />
          </label>
          <label>
            Number of Ratings:{" "}
            <input
              type="number"
              value={editedDoctor.numberOfRatings}
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                  numberOfRatings: e.target.value,
                })
              }
            />
          </label>
          <label>
            Rating:{" "}
            <input
              type="text"
              value={editedDoctor.rating}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, rating: e.target.value })
              }
            />
          </label>
          <label>
            About:{" "}
            <textarea
              value={editedDoctor.about}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, about: e.target.value })
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
          <p>Doctor Id: {id}</p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Speciality: {speciality}</p>
          <p>Number of Patients: {numberOfPatients}</p>
          <p>Photo: {photo}</p>
          <p>Hospital: {hospital}</p>
          <p>Number of Ratings: {numberOfRatings}</p>
          <p>Rating: {rating}</p>
          <p>About: {about}</p>
          <p>
            Time Slots:{" "}
            {timeSlots.map((slot) => `${slot.day}: ${slot.time}`).join(", ")}
          </p>
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

export default DoctorMemoized;
