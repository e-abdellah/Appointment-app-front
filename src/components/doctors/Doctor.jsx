import React, { useState, useCallback, memo, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../contexts/Auth.context";
import "./Doctor.css";

const DoctorMemoized = memo(function Doctor({
  id,
  name,
  email,
  speciality,
  photo,
  hospital,
  about,
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
      !editedDoctor.photo ||
      !editedDoctor.hospital ||
      !editedDoctor.about
    ) {
      alert("Please fill in all fields");
      return;
    }
    const updatedDoctor = {
      id: editedDoctor.id,
      name: editedDoctor.name,
      email: editedDoctor.email,
      speciality: editedDoctor.speciality,
      photo: editedDoctor.photo,
      hospital: editedDoctor.hospital,
      about: editedDoctor.about,
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
      photo,
      hospital,
      about,
    });
  };

  useEffect(() => {
    setEditedDoctor({
      id,
      name,
      email,
      speciality,
      photo,
      hospital,
      about,
    });
  }, [id, name, email, speciality, photo, hospital, about]);

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
            <input
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
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
            <input
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                })
              }
            />
          </label>
          <label>
            <input
              type="text"
              onChange={(e) => setEditedDoctor({ ...editedDoctor })}
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
          <p>Photo: {photo}</p>
          <p>Hospital: {hospital}</p>
          <p>About: {about}</p>
          <p></p>
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
