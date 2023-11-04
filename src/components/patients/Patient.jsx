import React, { useState } from "react";

const Patient = ({
  id,
  name,
  street,
  number,
  postalCode,
  city,
  condition,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="card bg-light border-dark mb-4">
      <div className="card-body">
        <h5 className="card-title" onClick={() => setShowDetails(!showDetails)}>
          {name}
        </h5>
        {showDetails && (
          <div>
            <p>
              Address: {street}, {number} {postalCode}, {city}
            </p>
            <p>Reason for last visit: {condition}</p>
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={handleDelete}
          style={{ backgroundColor: "var(--glacier-500)" }}
        >
          Delete patient
        </button>
      </div>
    </div>
  );
};

export default Patient;
